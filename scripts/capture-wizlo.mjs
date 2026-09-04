/**
 * Captures real Wizlo Form Builder screens from the local prototype repo.
 *
 * The prototype is one page whose screens are CSS-toggled rather than routed,
 * so there is no URL per screen — each capture has to be driven through the UI
 * the way a person would. That is what `setup` and each shot's `run` do.
 *
 * Every capture comes from a variant Subhrajit authored, using the prototype's
 * own demo templates — never a real tenant's form.
 *
 * Serve the repo first:
 *   cd "<wizlo-design>" && PORT=3456 node server.js
 * then:
 *   node scripts/capture-wizlo.mjs <out-dir> [width] [height]
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3456/prototypes/forms-builder-2.0";
const PORT = 9355;

const OUT = process.argv[2];
const WIDTH = Number(process.argv[3] || 1440);
const HEIGHT = Number(process.argv[4] || 900);
if (!OUT) throw new Error("usage: node scripts/capture-wizlo.mjs <out-dir> [w] [h]");
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const HELPERS = `
  window.__vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2; };
  window.__click = (sel, re) => {
    const els = [...document.querySelectorAll(sel)].filter(window.__vis);
    const el = re ? els.find((e) => new RegExp(re, 'i').test(e.textContent)) : els[0];
    if (!el || el.disabled) return false;
    el.click();
    return true;
  };
  window.__wait = (ms) => new Promise(r => setTimeout(r, ms));
  // The builder opens a first-run tour and a "what's new" strip. Both are
  // prototype chrome rather than product UI.
  window.__clean = () => {
    const tour = document.querySelector('#wz-tour');
    if (tour) tour.classList.add('hidden');
    for (const el of document.querySelectorAll('*')) {
      if (el.children.length < 8 && /WHAT'S NEW/i.test(el.textContent || '')) {
        const r = el.getBoundingClientRect();
        if (r.height > 10 && r.height < 90) el.style.display = 'none';
      }
    }
  };
`;

/** Walks the creation flow into the builder with `template` loaded. */
const setup = (template, carePath) => `
  (async () => {
    const cards = [...document.querySelectorAll('*')]
      .filter(e => e.children.length && new RegExp(${JSON.stringify(template)}).test(e.textContent) && e.querySelector('button'));
    if (!cards.length) return 'TEMPLATE NOT FOUND';
    const use = [...cards[cards.length - 1].querySelectorAll('button')].find(b => /^use$/i.test(b.textContent.trim()));
    if (!use) return 'USE BUTTON NOT FOUND';
    use.click(); await window.__wait(1800);

    window.__click('.cs-clinic-card', 'Northside Family'); await window.__wait(700);
    window.__click('.cs-cp-pill', ${JSON.stringify(carePath)}); await window.__wait(500);
    window.__click('.cs-clinic-continue'); await window.__wait(1500);
    window.__click('.builder-wrap button', 'skip for now'); await window.__wait(2500);
    window.__clean(); await window.__wait(500);
    return document.querySelector('.builder-wrap')?.className || 'unknown';
  })()
`;

const RUNS = [
  {
    // The stress-test template: 20 pages of real clinical branching.
    variant: "WZ-6289-logic-builder-fixes-demo-templates",
    setup: setup("Complex logic template", "Weight Management"),
    shots: [
      {
        name: "builder",
        settle: 1200,
        run: `(async () => {
          window.__clean();
          const f = [...document.querySelectorAll('.canvas-field')].filter(window.__vis)[0];
          if (f) { f.click(); await window.__wait(600); }
          window.__click('#brp-tab-fields'); await window.__wait(400);
          return 'three panels, field selected';
        })()`,
      },
      {
        name: "logic-rules",
        settle: 1400,
        run: `(async () => {
          // The eligibility page, whose rules are the real clinical gates.
          const row = [...document.querySelectorAll('#pages-list *')]
            .find(e => /Basic eligibility/.test(e.textContent) && window.__vis(e) && e.children.length < 4);
          if (row) { row.click(); await window.__wait(1200); }
          window.__click('#brp-tab-logic'); await window.__wait(1000);
          window.__clean();
          const panel = document.querySelector('.builder-right');
          return (panel?.innerText.match(/End form/g) || []).length + ' disqualify gates shown';
        })()`,
      },
      {
        name: "field-rule-editor",
        settle: 1600,
        run: `(async () => {
          // Field-level rule authoring lives in the field's own properties, not
          // in the right panel's Logic tab — that one is page-scoped.
          const row = [...document.querySelectorAll('#pages-list *')]
            .find(e => /General health/.test(e.textContent) && window.__vis(e) && e.children.length < 4);
          if (row) { row.click(); await window.__wait(1300); }

          const fields = [...document.querySelectorAll('.canvas-field')].filter(window.__vis);
          const target = fields.find(e => /Do you smoke/i.test(e.innerText)) || fields[1];
          if (!target) return 'NO FIELD';
          (target.querySelector('label,.cf-label,.cf-body') || target).click();
          await window.__wait(1300);

          const panel = document.querySelector('.builder-right');
          const add = [...panel.querySelectorAll('button,[role=button],a,div')]
            .filter(e => window.__vis(e) && /^add another rule$/i.test(e.textContent.trim()))[0];
          if (!add) return 'NO ADD RULE';
          add.click(); await window.__wait(1500);
          window.__clean();
          const sel = [...panel.querySelectorAll('select')].filter(window.__vis)[0];
          return sel ? 'rule editor open, target picker offers ' + (sel.options.length - 1) + ' fields' : 'editor missing';
        })()`,
      },
      {
        name: "ai-refusal",
        settle: 2400,
        run: `(async () => {
          // Wizzy declining an unparseable prompt. This is the one AI surface in
          // the prototype that demonstrably refuses rather than guessing.
          const fab = document.querySelector('#wizzy-fab');
          if (!fab) return 'NO WIZZY FAB';
          fab.click(); await window.__wait(1600);
          const panel = document.querySelector('#wizzy-wrap');
          const input = panel?.querySelector('textarea,input[type=text]');
          if (!input) return 'NO WIZZY INPUT';
          input.focus();
          input.value = 'do the needful with the thing';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          await window.__wait(400);
          const send = [...panel.querySelectorAll('button')]
            .find(b => /send|submit/i.test(b.className + b.textContent + (b.getAttribute('aria-label') || '')));
          if (send) send.click();
          else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          await window.__wait(2600);
          return /not sure how to help/i.test(panel.innerText) ? 'declined as expected' : 'NO REFUSAL IN TRANSCRIPT';
        })()`,
      },
    ],
  },
  {
    // Canvas shots come from the 3-page template on purpose: auto-arranged, 20
    // pages render as a thin strip in an empty grid, where 3 pages show the
    // branching legibly at 100%.
    variant: "WZ-6289-logic-builder-fixes-demo-templates",
    setup: setup("GLP-1 Weight Management", "Weight Management"),
    shots: [
      {
        name: "logic-canvas",
        settle: 2400,
        run: `(async () => {
          window.__click('#logic-canvas-btn'); await window.__wait(2200);
          const close = document.querySelector('#lco-insp-close');
          if (close && window.__vis(close)) { close.click(); await window.__wait(700); }
          window.__click('#lco-fit-view-btn'); await window.__wait(1400);
          return document.querySelectorAll('#logic-canvas-overlay [class*="lco-node"]').length + ' node elements';
        })()`,
      },
      {
        name: "logic-canvas-inspector",
        settle: 1800,
        run: `(async () => {
          // Clicking the node opens it — the per-node action buttons only
          // appear on hover, which a driven click never triggers.
          const node = document.querySelector('#logic-canvas-overlay [class*="lco-node"]');
          if (!node) return 'NO NODE';
          node.click(); await window.__wait(1400);
          return document.querySelector('#lco-insp-close') ? 'inspector open' : 'inspector missing';
        })()`,
      },
      {
        name: "simulate",
        settle: 2600,
        run: `(async () => {
          const close = document.querySelector('#lco-insp-close');
          if (close && window.__vis(close)) { close.click(); await window.__wait(600); }
          window.__click('#lco-simulate-btn'); await window.__wait(2400);
          // The tell is the sim player becoming visible; the stop button stays
          // hidden either way, which is what made the first pass report wrongly.
          const p = document.querySelector('#sim-player');
          const r = p?.getBoundingClientRect();
          return r && r.width > 50 && r.height > 50 ? 'simulating' : 'sim did not start';
        })()`,
      },
    ],
  },
  {
    // Version history and Wizzy.
    //
    // The Logic-Canvas AI flow builder is deliberately absent from this list:
    // its handler is wired up in builder.js, but the markup it looks for
    // (#lco-ai-flow-btn, #lco-ai-panel, #lco-ai-flow-input) exists in no
    // variant's HTML, so the feature never renders and there is nothing to
    // capture. Verified against the live DOM, not just by grep.
    variant: "WZ-6288-logic-builder-integrations-ai",
    setup: setup("GLP-1 Weight Management", "Weight Management"),
    shots: [
      {
        name: "version-history",
        settle: 1800,
        run: `(async () => {
          window.__clean();
          const b = document.querySelector('#version-history-btn') || document.querySelector('#version-history-btn-bt');
          if (!b) return 'VH BUTTON MISSING';
          b.click(); await window.__wait(1600);
          const d = document.querySelector('#vh-drawer');
          return d && !d.classList.contains('hidden') ? 'drawer open' : 'drawer did not open';
        })()`,
      },
      {
        name: "wizzy",
        settle: 1800,
        run: `(async () => {
          const back = document.querySelector('#vh-backdrop');
          if (back && window.__vis(back)) { back.click(); await window.__wait(900); }
          window.__clean();
          const f = document.querySelector('#wizzy-fab');
          if (!f) return 'WIZZY FAB MISSING';
          f.click(); await window.__wait(1600);
          return 'wizzy open';
        })()`,
      },
    ],
  },
];

async function main() {
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(OUT, "..", "chrome-wizlo-profile")}`,
    `--window-size=${WIDTH},${HEIGHT}`,
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

  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    return r.result?.value;
  };

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

  for (const run of RUNS) {
    console.log(`\n-- ${run.variant}`);
    await send("Page.navigate", { url: `${BASE}/${run.variant}/index.html` });
    await sleep(4000);
    await evaluate(HELPERS);
    console.log("   setup:", await evaluate(run.setup));

    for (const shot of run.shots) {
      await evaluate(HELPERS);
      const note = await evaluate(shot.run);
      await sleep(shot.settle);
      await evaluate("window.__clean()");

      const { data } = await send("Page.captureScreenshot", { format: "png" });
      const file = path.join(OUT, `${shot.name}.png`);
      fs.writeFileSync(file, Buffer.from(data, "base64"));
      console.log(
        `   ${shot.name.padEnd(24)} ${(fs.statSync(file).size / 1024).toFixed(0)}KB   ${note}`
      );
    }
  }

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
