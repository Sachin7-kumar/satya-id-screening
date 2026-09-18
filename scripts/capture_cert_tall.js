import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const distDir = 'd:/react/satya-id-screening/dist';
const port = 5896;
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
  const outSeal = 'd:\\react\\satya-id-screening\\bsa_certificate_seal_preview.png';
  const destSeal = 'C:\\Users\\Sachin\\.gemini\\antigravity\\brain\\65e48576-9a3f-4c54-ad01-7e6346b32e8a\\bsa_certificate_seal_preview.png';
  
  // We can pass script execution or a tall window size so the whole cert modal renders completely without inner scrollbar clipping if possible, or scroll
  // In our css: .cert-modal-dialog { max-height: 90vh; }
  // If window height is 2200, max-height 90vh is 1980px!
  const cmd = `"${edgePath}" --headless=new --disable-gpu --window-size=1500,2200 --virtual-time-budget=3000 --screenshot="${outSeal}" "http://${host}:${port}/?cert=open"`;
  
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Error capturing screenshot:', err.message);
    } else {
      console.log(`Seal screenshot saved: ${outSeal}`);
      fs.copyFileSync(outSeal, destSeal);
    }
    server.close(() => {
      process.exit(0);
    });
  });
});
