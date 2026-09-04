/**
 * Captures real Nivex product screens from the deployed prototype.
 *
 * Chrome's `--screenshot` flag cannot dismiss the first-run dashboard tour or
 * hide the floating prototype navigator, and both land on top of every shot.
 * So this drives Chrome over the DevTools protocol instead: navigate, run a
 * prep script in the page, then capture. Node 24 ships a global WebSocket, so
 * there is no dependency to install for it.
 *
 * Output is 2x (deviceScaleFactor 2) PNG, converted to WebP by the caller.
 *
 *   node scripts/capture-nivex.mjs <out-dir>
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "https://techdome-io.github.io/nivex-project/app-v3/";
const PORT = 9222;
const WIDTH = 1440;
const HEIGHT = 900;

const OUT = process.argv[2];
if (!OUT) throw new Error("usage: node capture-nivex.mjs <out-dir>");
fs.mkdirSync(OUT, { recursive: true });

/** Screens to capture: [filename, hash, extra wait ms]. */
const SCREENS = [
  ["splash", "#/", 1200],
  ["choose-service", "#/choose-service", 600],
  ["import-portfolio", "#/import-portfolio", 600],
  ["dashboard", "#/dashboard", 1800],
  ["audit-prescription", "#/dashboard/audit", 1800],
  ["portfolio", "#/dashboard/portfolio", 1800],
  ["goals", "#/dashboard/goals", 1200],
  ["trades", "#/dashboard/trades", 1200],
  ["team-login", "#/team/login", 600],
  ["advisor-clients", "#/staff", 1400],
  ["admin-overview", "#/admin", 1400],
  ["admin-cases", "#/admin/cases", 1200],
  ["admin-investors", "#/admin/investors", 1200],
];

/**
 * Runs in the page before every capture.
 *
 * The tour flag is written for any investor id the app might be using, since
 * the key is per-investor. The navigator is a dev affordance, not product UI —
 * it would appear in the corner of every screenshot otherwise.
 */
const PREP = `
  (() => {
    try {
      // The app falls back to prefers-color-scheme when this key is unset, and
      // headless Chrome reports dark — which is how the first pass came out
      // dark. Setting it during priming means every later navigation boots
      // light, and the emulated media query below covers the first paint.
      localStorage.setItem('nivex-theme', 'light');

      for (const id of ['inv_1','inv_2','inv_3']) {
        localStorage.setItem('nivex.dashboardTourSeen.' + id, 'true');
      }
      for (const k of Object.keys(localStorage)) {
        if (/tour|onboard|firstRun|welcome/i.test(k)) localStorage.setItem(k, 'true');
      }
    } catch {}

    // Hide the prototype navigator and any tour overlay still mounted.
    const style = document.createElement('style');
    style.textContent = \`
      [title*="Prototype navigator" i],
      [aria-label*="Prototype navigator" i] { display: none !important; }
    \`;
    document.head.appendChild(style);

    // Dismiss the tour if it is already on screen.
    for (const b of document.querySelectorAll('button')) {
      if (/^(skip|got it|dismiss|close)$/i.test(b.textContent.trim())) { b.click(); break; }
    }
    return true;
  })()
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const userDataDir = path.join(OUT, "..", "chrome-cdp-profile");
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    "about:blank",
  ]);
  chrome.stderr.on("data", () => {});

  // Wait for the debugging endpoint.
  let target = null;
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {}
    await sleep(500);
  }
  if (!target) throw new Error("Chrome DevTools endpoint never came up");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", rej, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
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
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "light" }],
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 2,
    mobile: false,
  });

  // Prime the origin once so localStorage is writable, then set the flags.
  await send("Page.navigate", { url: BASE });
  await sleep(3500);
  await send("Runtime.evaluate", { expression: PREP, awaitPromise: false });

  for (const [name, hash, extra] of SCREENS) {
    await send("Page.navigate", { url: BASE + hash });
    await sleep(1500 + extra);
    await send("Runtime.evaluate", { expression: PREP, awaitPromise: false });
    await sleep(500);

    const { data } = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    const file = path.join(OUT, `${name}.png`);
    fs.writeFileSync(file, Buffer.from(data, "base64"));
    console.log(`${name.padEnd(20)} ${hash.padEnd(24)} ${(fs.statSync(file).size / 1024).toFixed(0)}KB`);
  }

  ws.close();
  chrome.kill();
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
