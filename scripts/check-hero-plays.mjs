/**
 * Proves a loop on the page actually plays, by capturing it twice a few
 * seconds apart and comparing the pixels.
 *
 * The browser pane throttles media while it is hidden, so `video.paused` read
 * from there is not evidence either way. Two different frames are.
 *
 *   node scripts/check-hero-plays.mjs <url> [setup-expression]
 *
 * The optional setup expression runs after load and before the check, for
 * pages where the loop sits behind an interaction — clicking a playground
 * filter tab, say. It is awaited, so it can return a promise.
 */
import { spawn } from "child_process";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_ARG = process.argv[2];
const SETUP = process.argv[3];
const PORT = 9345;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--autoplay-policy=no-user-gesture-required",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=" + process.env.TEMP + "/chrome-hero-check",
  "--window-size=1440,1000",
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
await send("Page.navigate", { url: URL_ARG });
await sleep(6000);

if (SETUP) {
  await send("Runtime.evaluate", { expression: SETUP, awaitPromise: true });
  await sleep(1500);
}

// Put the hero fully in view so the visibility observer starts it.
await send("Runtime.evaluate", {
  expression: `document.querySelector('video').scrollIntoView({block:'center'})`,
});
await sleep(3000);

const state = await send("Runtime.evaluate", {
  expression: `(() => { const v = document.querySelector('video');
    return JSON.stringify({paused: v.paused, t: +v.currentTime.toFixed(2), rs: v.readyState}); })()`,
});
console.log("state:", state.result.value);

const shot = async () => {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  return Buffer.from(data, "base64");
};

const a = await shot();
await sleep(3000);
const b = await shot();

const state2 = await send("Runtime.evaluate", {
  expression: `(() => { const v = document.querySelector('video');
    return JSON.stringify({paused: v.paused, t: +v.currentTime.toFixed(2)}); })()`,
});
console.log("state after 3s:", state2.result.value);

const raw = async (buf) =>
  sharp(buf).removeAlpha().resize(160, 100, { fit: "fill" }).raw().toBuffer();
const [ra, rb] = [await raw(a), await raw(b)];

let diff = 0;
for (let i = 0; i < ra.length; i++) if (Math.abs(ra[i] - rb[i]) > 8) diff++;
const pct = ((diff / ra.length) * 100).toFixed(1);
console.log(`pixels changed between the two captures: ${pct}%`);
console.log(pct > 1 ? "PLAYING — the frame advanced" : "NOT PLAYING — identical frames");

ws.close();
chrome.kill();
process.exit(0);
