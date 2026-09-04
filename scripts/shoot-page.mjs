/**
 * Full-page screenshot of a local route, for reviewing a long page.
 *
 * The browser pane cannot reliably capture a scrolled position on this site —
 * the perpetual rAF loops keep it from settling — so review goes through
 * headless Chrome instead. Scroll-reveal is forced on and lazy images are made
 * eager first, or everything below the fold captures blank.
 *
 *   node scripts/shoot-page.mjs <url> <out.png> [width] [height] [setup-expression]
 *
 * The optional setup expression runs after prep and before the capture, for
 * states that only exist behind an interaction — a playground filter tab, say.
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , URL_ARG, OUT, W = "1440", H = "1000", SETUP] = process.argv;
if (!URL_ARG || !OUT) throw new Error("usage: shoot-page.mjs <url> <out.png> [w] [h]");

const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PREP = `
  (async () => {
    // The reveal effect hides everything not yet scrolled past.
    document.documentElement.removeAttribute('data-reveal');
    document.querySelectorAll('[data-reveal-item]').forEach(e => e.classList.add('is-revealed'));

    // Force every lazy image to fetch. Deliberately not awaiting their load
    // events — a Next placeholder that never fires one would hang the capture,
    // and the fixed wait below is enough in practice.
    const imgs = [...document.querySelectorAll('img')];
    imgs.forEach(i => { i.loading = 'eager'; if (i.dataset.src) i.src = i.dataset.src; });
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 2500));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 800));
    return imgs.filter(i => i.complete && !i.naturalWidth).length;
  })()
`;

/** Viewport slices, top of each, in CSS pixels. */
const OFFSETS = (process.env.SHOT_OFFSETS || "0").split(",").map(Number);

async function main() {
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(path.dirname(OUT), "chrome-shoot-profile")}`,
    `--window-size=${W},${H}`,
    "about:blank",
  ]);
  chrome.stderr.on("data", () => {});

  let target = null;
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {}
    await sleep(500);
  }
  if (!target) throw new Error("no devtools target");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", rej, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(JSON.stringify(m.error)));
      else resolve(m.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: Number(W),
    height: Number(H),
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: URL_ARG });
  await sleep(5000);

  const prep = await send("Runtime.evaluate", { expression: PREP, awaitPromise: true });
  if (SETUP) {
    await send("Runtime.evaluate", { expression: SETUP, awaitPromise: true });
    await sleep(1200);
  }
  const broken = prep.result?.value ?? "?";

  const height = (
    await send("Runtime.evaluate", { expression: "document.body.scrollHeight" })
  ).result.value;

  for (const y of OFFSETS) {
    await send("Runtime.evaluate", { expression: `window.scrollTo(0,${y})` });
    await sleep(700);
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    const file = OFFSETS.length > 1 ? OUT.replace(/\.png$/, `-${y}.png`) : OUT;
    fs.writeFileSync(file, Buffer.from(data, "base64"));
    console.log(`${file}  ${(fs.statSync(file).size / 1024).toFixed(0)}KB`);
  }
  console.log(`pageHeight=${height}  brokenImages=${broken}`);

  ws.close();
  chrome.kill();
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(e);
    process.exit(1);
  }
);
