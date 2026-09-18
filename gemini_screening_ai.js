/**
 * Google AI Studio / Gemini Document Screening CLI Script
 * Powered by @google/genai (Gemini 2.5 Flash / Gemini 3.7 Flash)
 *
 * Usage:
 *   export GEMINI_API_KEY="your_api_key"
 *   node gemini_screening_ai.js ./sample_aadhaar.jpg
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY environment variable not found.');
  console.log('💡 Tip: Set your key using: export GEMINI_API_KEY="AIzaSy..." (or pass it in the script)');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function screenDocument(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ File not found at: ${imagePath}`);
    return;
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Data = imageBuffer.toString('base64');
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';

  console.log('================================================================');
  console.log('  🇮🇳 SATYA-ID: GOOGLE AI STUDIO / GEMINI DOCUMENT FORENSIC SCAN');
  console.log(`  Target Artifact: ${path.basename(imagePath)}`);
  console.log('  AI Model: gemini-2.5-flash');
  console.log('================================================================\n');

  const systemInstruction = `You are a Senior Digital Document Forensic Expert for the Ministry of Home Affairs (MHA) & National Cyber Forensic Laboratory (NCFL), India.
Perform deep visual forensics, micro-typography check, and cross-field logic analysis on Indian identity documents (Aadhaar, PAN, Passport, Voter ID, Driving License).
Detect any copy-move splicing, font inconsistencies, generative AI inpainting, or face morphing.
Return your findings strictly in valid JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Analyze this identity document for forgery, font baseline jitter, tampering, and mathematical logic.' },
            {
              inlineData: {
                mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    console.log('✅ Forensic Analysis Complete:\n');
    const result = JSON.parse(response.text);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('❌ Forensic Screening Error:', err.message);
  }
}

const targetFile = process.argv[2];
if (!targetFile) {
  console.log('ℹ️ Usage: node gemini_screening_ai.js <path_to_document_image>');
} else {
  screenDocument(targetFile);
}
