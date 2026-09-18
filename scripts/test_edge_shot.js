import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve('scripts/test_chart.html');
const outPng = path.resolve('scripts/test_out.png');

if (fs.existsSync(outPng)) fs.unlinkSync(outPng);

const cmd = `"${edgePath}" --headless=new --screenshot="${outPng}" --window-size=600,400 --default-background-color=00000000 "file:///${htmlFile.replace(/\\/g, '/')}"`;
console.log('Running:', cmd);
try {
  execSync(cmd);
  console.log('Exists:', fs.existsSync(outPng), 'Size:', fs.existsSync(outPng) ? fs.statSync(outPng).size : 0);
} catch (e) {
  console.error('Error:', e.message);
}
