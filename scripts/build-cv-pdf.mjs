// Prints the /cv page to public/Melvin-Wafula-CV.pdf with headless Chrome or Edge.
//
//   npm run cv                         build, serve on a spare port, print, stop
//   CV_URL=http://localhost:3000/cv npm run cv   print a server you already run
//
// Next 12 does not run on Node 25+ (SlowBuffer was removed), so on newer Node
// the script re-runs itself under Node 22, matching "engines" in package.json.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public', 'Melvin-Wafula-CV.pdf');
const port = Number(process.env.CV_PORT || 3123);
const nodeMajor = Number(process.versions.node.split('.')[0]);

if (nodeMajor >= 25 && !process.env.CV_REEXEC) {
  console.log(`Node ${process.versions.node} cannot run Next 12; re-running under Node 22.`);
  const result = spawnSync('npx', ['-y', 'node@22', fileURLToPath(import.meta.url)], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, CV_REEXEC: '1' },
  });
  process.exit(result.status ?? 1);
}

const findBrowser = () => {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('No Chrome or Edge found; set CHROME_PATH.');
  return found;
};

const waitFor = async (url, timeoutMs = 120000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for ${url}`);
};

const next = (args, opts = {}) =>
  spawn(process.execPath, [path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'), ...args], {
    cwd: root,
    env: { ...process.env, NEXT_DIST_DIR: '.next-cv' },
    stdio: 'inherit',
    ...opts,
  });

const run = (child) =>
  new Promise((resolve, reject) =>
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))))
  );

const printPdf = (url) => {
  const result = spawnSync(
    findBrowser(),
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${output}`,
      url,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
  if (!existsSync(output) || result.status !== 0) {
    throw new Error(`Browser failed to print: ${result.stderr?.toString().slice(-500)}`);
  }
  console.log(`Wrote ${path.relative(root, output)} (${Math.round(statSync(output).size / 1024)} KB)`);
};

let server;
try {
  if (process.env.CV_URL) {
    printPdf(process.env.CV_URL);
  } else {
    await run(next(['build']));
    server = next(['start', '-p', String(port)]);
    const url = `http://localhost:${port}/cv`;
    await waitFor(url);
    printPdf(url);
  }
} finally {
  if (server) server.kill();
}
