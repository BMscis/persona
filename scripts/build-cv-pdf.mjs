// Prints the /cv page to public/Melvin-Wafula-CV.pdf with headless Chrome or Edge.
//
//   npm run cv                         build, serve on a spare port, print, stop
//   CV_URL=http://localhost:3000/cv npm run cv   print a server you already run
//
// Next 12 does not run on Node 25+ (SlowBuffer was removed), so on newer Node
// the script re-runs itself under Node 22, matching "engines" in package.json.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
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
  setMetadata(output);
  console.log(`Wrote ${path.relative(root, output)} (${Math.round(statSync(output).size / 1024)} KB)`);
};

// Chrome leaves Author empty and puts its own user agent in Creator. Job sites read
// these fields, so replace the Info dictionary with a PDF incremental update: append
// a new version of the Info object, a one-entry xref section and a trailer whose
// /Prev points at Chrome's xref. The original bytes are left untouched.
const META = {
  Title: 'Melvin Wafula - CV',
  Author: 'Melvin Wafula',
  Subject: 'Senior Backend Engineer, Digital Assets and Digital Health',
  Keywords: 'Backend, Node.js, TypeScript, Python, PostgreSQL, Digital assets, Algorand, Payments, Digital health, FHIR, WHO SMART Guidelines',
  Creator: 'Melvin Wafula',
};

const pdfString = (s) => `(${s.replace(/[\\()]/g, (c) => `\\${c}`)})`;
const pdfDate = (d) => `D:${d.toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z`;

const setMetadata = (file) => {
  const pdf = readFileSync(file);
  const tail = pdf.subarray(Math.max(0, pdf.length - 2048)).toString('latin1');
  const prevXref = Number(tail.match(/startxref\s+(\d+)\s+%%EOF\s*$/)?.[1]);
  const trailer = tail.slice(tail.lastIndexOf('trailer'));
  const size = trailer.match(/\/Size\s+(\d+)/)?.[1];
  const rootRef = trailer.match(/\/Root\s+(\d+\s+\d+\s+R)/)?.[1];
  const infoNum = trailer.match(/\/Info\s+(\d+)\s+0\s+R/)?.[1];
  const id = trailer.match(/\/ID\s*(\[[^\]]*\])/)?.[1];
  if (!prevXref || !size || !rootRef || !infoNum) {
    throw new Error('Unexpected PDF trailer from the browser; metadata not written.');
  }

  const now = pdfDate(new Date());
  const fields = { ...META, CreationDate: now, ModDate: now };
  const body = Object.entries(fields)
    .map(([k, v]) => `/${k} ${k.endsWith('Date') ? `(${v})` : pdfString(v)}`)
    .join('\n');

  let out = '\n';
  const objOffset = pdf.length + Buffer.byteLength(out, 'latin1');
  out += `${infoNum} 0 obj\n<<${body}>>\nendobj\n`;
  const xrefOffset = pdf.length + Buffer.byteLength(out, 'latin1');
  // Start the section with the object 0 free-list head so strict readers that
  // expect a zero-indexed table accept it.
  const entry = `${String(objOffset).padStart(10, '0')} 00000 n\r\n`;
  const xref =
    infoNum === '1'
      ? `xref\n0 2\n0000000000 65535 f\r\n${entry}`
      : `xref\n0 1\n0000000000 65535 f\r\n${infoNum} 1\n${entry}`;
  out +=
    xref +
    `trailer\n<</Size ${size}\n/Root ${rootRef}\n/Info ${infoNum} 0 R\n/Prev ${prevXref}${id ? `\n/ID ${id}` : ''}>>\n` +
    `startxref\n${xrefOffset}\n%%EOF\n`;

  writeFileSync(file, Buffer.concat([pdf, Buffer.from(out, 'latin1')]));
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
