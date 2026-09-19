/**
 * SATYA-ID: Full-Stack Forensic Identity & Document Screening API Server
 * Ministry of Home Affairs (MHA) | Indian Cyber Crime Coordination Centre (I4C)
 * 
 * Runs the complete backend API alongside the production Vite frontend.
 */

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from '../api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Serve built frontend assets in production
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all route to serve SPA frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log('================================================================');
  console.log(`  🇮🇳 SATYA-ID FORENSIC API SERVER LISTENING ON PORT: ${PORT}`);
  console.log(`  🚀 Web Application Ready: http://localhost:${PORT}`);
  console.log('================================================================');
});
