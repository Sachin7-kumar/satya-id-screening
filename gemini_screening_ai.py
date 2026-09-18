"""
SATYA-ID: Google AI Studio / Gemini Multimodal Document Forensic Engine (Python)
Powered by the official `google-genai` SDK (Gemini 2.5 Flash / Gemini 3.7 Flash)

Setup:
    pip install google-genai pillow
    set GEMINI_API_KEY=your_api_key

Usage:
    python gemini_screening_ai.py sample_aadhaar.jpg
"""

import os
import sys
import json
from google import genai
from google.genai import types
from PIL import Image

def analyze_document_with_gemini(image_path: str, model: str = "gemini-2.5-flash"):
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY environment variable not set.")
        print("💡 Set it using: export GEMINI_API_KEY='AIzaSy...' or set GEMINI_API_KEY='...'")
        return

    client = genai.Client(api_key=api_key)

    if not os.path.exists(image_path):
        print(f"❌ File not found: {image_path}")
        return

    image = Image.open(image_path)

    system_instruction = """You are a Senior Digital Document Forensic Expert for the Ministry of Home Affairs (MHA) & National Cyber Forensic Laboratory (NCFL), India.
Perform deep visual forensics, micro-typography check, and cross-field logic analysis on Indian identity documents (Aadhaar, PAN, Passport, Voter ID, Driving License).
Detect any copy-move splicing, font baseline jitter, generative AI inpainting, or face morphing.
Return your findings strictly in structured JSON matching this schema:
{
  "documentType": "Aadhaar Card" | "PAN Card" | "Passport" | "Voter ID" | "Driving License",
  "extractedFields": {"fullName": "", "idNumber": "", "dob": "", "gender": "", "address": ""},
  "visualTamperAssessment": {
    "isTampered": true/false,
    "tamperConfidenceScore": 0-100,
    "primaryTamperType": "NONE" | "DOB_ALTERATION" | "NAME_SPLICING" | "FACE_MORPH_ATTACK" | "FONT_SUBSTITUTION",
    "tamperedFieldsList": [],
    "fontMetrologyVerdict": "",
    "compressionNoiseNotes": "",
    "faceBiometricNotes": ""
  },
  "crossFieldLogic": {
    "summaryVerdict": "AUTHENTIC" | "SUSPECT" | "CRITICAL_FORGERY_DETECTED",
    "evidentiaryRationale": ""
  }
}"""

    print("================================================================")
    print("  🇮🇳 SATYA-ID: GOOGLE AI STUDIO / GEMINI MULTIMODAL FORENSIC SCAN")
    print(f"  Target File: {image_path}")
    print(f"  Model: {model}")
    print("================================================================\n")

    response = client.models.generate_content(
        model=model,
        contents=[
            image,
            "Please perform a complete digital forensic screening on this Indian identity document."
        ],
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            temperature=0.1
        )
    )

    print("✅ Forensic Examination Result:\n")
    try:
        parsed = json.loads(response.text)
        print(json.dumps(parsed, indent=2))
    except Exception:
        print(response.text)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python gemini_screening_ai.py <path_to_image>")
    else:
        analyze_document_with_gemini(sys.argv[1])
