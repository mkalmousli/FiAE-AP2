// Baut bundle.js: alle in den Manifesten gelisteten Dateien in Ladereihenfolge zu einer Datei (ein Request statt ~430).
// Aufruf: node build.mjs   (ohne Abhängigkeiten). Danach main.js und sw.js tragen die neue Version.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const NAMES = ['core', 'ui', 'viz', 'tools', 'ps', 'infra', 'eua', 'wiso', 'de', 'exam', 'course', 'ref', 'last'];

// Manifeste in einer Sandbox ausführen, um die Dateiliste zu erhalten.
const box = {AP2: {files: [], blocks: {}, tools: {}}};
box.AP2.pages = (dir, spec) => Object.keys(spec).forEach((name) => {
  for (let i = 1; i <= spec[name]; i++) box.AP2.files.push('content/' + dir + '/' + name + '-' + i + '.js');
});
vm.createContext(box);
NAMES.forEach((name) => vm.runInContext(read('manifest/' + name + '.js'), box, {filename: 'manifest/' + name + '.js'}));

const parts = ['window.AP2 = {files: [], blocks: {}, tools: {}};\nAP2.pages = function () {};\n'];
let bad = 0;
box.AP2.files.forEach((file) => {
  const src = read(file);
  try { new vm.Script(src, {filename: file}); } catch (err) { bad++; console.error('Syntaxfehler in ' + file + ': ' + err.message); }
  parts.push('// ' + file + '\n' + src.replace(/\s+$/, '') + '\n;\n');
});
if (bad) process.exit(1);
const code = parts.join('');
const version = crypto.createHash('sha256').update(code).digest('hex').slice(0, 10);
fs.writeFileSync(path.join(root, 'bundle.js'), code);
// Versionsstempel in Lader und Service Worker eintragen (Cache-Busting).
const stamp = (file, re, value) => {
  const src = read(file);
  if (!re.test(src)) throw new Error('Versionsmarke fehlt in ' + file);
  fs.writeFileSync(path.join(root, file), src.replace(re, value));
};
stamp('main.js', /const VERSION = '[^']*';/, "const VERSION = '" + version + "';");
stamp('sw.js', /const VERSION = '[^']*';/, "const VERSION = '" + version + "';");
console.log('bundle.js: ' + box.AP2.files.length + ' Dateien, ' + Math.round(code.length / 1024) + ' KB, Version ' + version);
