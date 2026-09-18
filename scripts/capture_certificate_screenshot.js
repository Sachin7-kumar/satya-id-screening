import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const distDir = 'd:/react/satya-id-screening/dist';
const port = 5897;
const host = '127.0.0.1';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outScreenshot = 'd:\\react\\satya-id-screening\\bsa_certificate_preview.png';
  const destArtifact = 'C:\\Users\\Sachin\\.gemini\\antigravity\\brain\\65e48576-9a3f-4c54-ad01-7e6346b32e8a\\bsa_certificate_preview.png';
  
  if (fs.existsSync(outScreenshot)) fs.unlinkSync(outScreenshot);
  if (fs.existsSync(destArtifact)) fs.unlinkSync(destArtifact);
  
  const cmd = `"${edgePath}" --headless=new --disable-gpu --window-size=1500,1600 --virtual-time-budget=3000 --screenshot="${outScreenshot}" "http://${host}:${port}/?cert=open"`;
  
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Error capturing screenshot:', err.message);
    } else {
      console.log(`Certificate screenshot saved successfully to ${outScreenshot} (${fs.statSync(outScreenshot).size} bytes)`);
      fs.copyFileSync(outScreenshot, destArtifact);
      console.log('Copied certificate preview to artifacts directory!');
    }
    server.close(() => {
      console.log('Server stopped cleanly.');
      process.exit(0);
    });
  });
});
