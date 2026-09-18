import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const testDir = 'd:/react/satya-id-screening/test_step_dir';
const testPptx = 'd:/react/satya-id-screening/test_step.pptx';

function testOpen() {
  if (fs.existsSync(testPptx)) fs.unlinkSync(testPptx);
  execSync(`powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${testDir}', '${testPptx}')"`);
  
  try {
    const res = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/export_slides_images.ps1 -targetPath "${testPptx}"`, { encoding: 'utf8' });
    return { ok: true, output: res };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// 1. Test baseline
if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
fs.cpSync('template_unzipped', testDir, { recursive: true });
console.log('Testing baseline copy:');
console.log(testOpen().ok ? 'Baseline PASS' : 'Baseline FAIL');

// Test Slide 1
console.log('\nTesting with Slide 1 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide1.xml', path.join(testDir, 'ppt/slides/slide1.xml'));
console.log(testOpen().ok ? 'Slide 1 PASS' : 'Slide 1 FAIL');

// Test Slide 2
console.log('\nTesting with Slide 2 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide2.xml', path.join(testDir, 'ppt/slides/slide2.xml'));
console.log(testOpen().ok ? 'Slide 2 PASS' : 'Slide 2 FAIL');

// Test Slide 3
console.log('\nTesting with Slide 3 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide3.xml', path.join(testDir, 'ppt/slides/slide3.xml'));
console.log(testOpen().ok ? 'Slide 3 PASS' : 'Slide 3 FAIL');

// Test Slide 4
console.log('\nTesting with Slide 4 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide4.xml', path.join(testDir, 'ppt/slides/slide4.xml'));
console.log(testOpen().ok ? 'Slide 4 PASS' : 'Slide 4 FAIL');

// Test Slide 5
console.log('\nTesting with Slide 5 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide5.xml', path.join(testDir, 'ppt/slides/slide5.xml'));
console.log(testOpen().ok ? 'Slide 5 PASS' : 'Slide 5 FAIL');

// Test Slide 6
console.log('\nTesting with Slide 6 modified:');
fs.cpSync('sih_official_build_6slides/ppt/slides/slide6.xml', path.join(testDir, 'ppt/slides/slide6.xml'));
console.log(testOpen().ok ? 'Slide 6 PASS' : 'Slide 6 FAIL');
