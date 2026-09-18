import fs from 'fs';
import { execSync } from 'child_process';

const testDir = 'd:/react/satya-id-screening/test_verify_pptx';
if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });

execSync(`powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('d:/react/satya-id-screening/SIH2025-IDEA-Presentation-SATYA-ID.pptx', '${testDir}')"`);

console.log('Verified PPTX extracts cleanly!');
const slides = fs.readdirSync(testDir + '/ppt/slides').filter(f => f.endsWith('.xml'));
console.log('Slides in clean presentation:', slides);

for (let s of slides) {
  const xml = fs.readFileSync(testDir + '/ppt/slides/' + s, 'utf8');
  console.log(`${s} length: ${xml.length} bytes`);
}
