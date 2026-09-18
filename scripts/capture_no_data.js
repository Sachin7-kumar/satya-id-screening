import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const distDir = 'd:/react/satya-id-screening/dist';
const port = 5895;
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
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outShot = 'd:\\react\\satya-id-screening\\no_data_given_preview.png';
  const destArtifact = 'C:\\Users\\Sachin\\.gemini\\antigravity\\brain\\65e48576-9a3f-4c54-ad01-7e6346b32e8a\\no_data_given_preview.png';
  
  const cmd = `"${edgePath}" --headless=new --disable-gpu --window-size=1600,1250 --virtual-time-budget=3000 --screenshot="${outShot}" "http://${host}:${port}/?case=case_no_data_given"`;
  
  exec(cmd, (err) => {
    if (!err && fs.existsSync(outShot)) {
      fs.copyFileSync(outShot, destArtifact);
      console.log('No-data screenshot captured successfully!');
    }
    server.close(() => process.exit(0));
  });
});
