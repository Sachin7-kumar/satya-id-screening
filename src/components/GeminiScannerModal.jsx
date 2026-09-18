import React, { useState } from 'react';
import { GeminiStudioEngine } from '../forensics/geminiStudio';

export default function GeminiScannerModal({ isOpen, onClose, canvas, currentTestCase }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleScan = async () => {
    if (!apiKey.trim()) {
      setErrorMsg('Please enter a valid Google AI Studio Gemini API Key to proceed.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);
    setGeminiResult(null);
    localStorage.setItem('gemini_api_key', apiKey.trim());

    try {
      const res = await GeminiStudioEngine.analyzeDocumentWithGemini(canvas, apiKey.trim(), model);
      setGeminiResult(res);
    } catch (err) {
      setErrorMsg(err.message || 'Error occurred while contacting Google AI Studio.');
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictBadge = (verdict) => {
    if (verdict === 'AUTHENTIC') return 'badge-success';
    if (verdict === 'SUSPECT') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="modal-overlay active">
      <div className="cert-modal-dialog" style={{ maxWidth: '850px', background: '#0b1324', color: '#f8fafc', border: '1px solid var(--accent-cyan)' }}>
        <button onClick={onClose} className="cert-close-btn" style={{ background: '#1e293b', color: '#fff' }}>&times;</button>

        {/* Modal Header */}
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '800' }}>
            <span>🤖</span> GOOGLE AI STUDIO / GEMINI MULTIMODAL FORENSIC ENGINE
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '0.35rem' }}>
            Deep Vision &amp; Generative Tamper Screening
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Powered by Google Gemini 2.5 Flash &amp; Gemini 3.7 Flash via the official <code>@google/genai</code> SDK.
          </p>
        </div>

        {/* API Key Configuration */}
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>
                Google AI Studio API Key:
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', background: '#070b14', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ width: '180px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontWeight: '600' }}>
                Gemini Model:
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', background: '#070b14', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', fontSize: '0.82rem' }}
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast)</option>
                <option value="gemini-3.7-flash">Gemini 3.7 Flash (Reasoning)</option>
              </select>
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={handleScan}
                disabled={isLoading}
                className="btn btn-primary"
                style={{ height: '36px' }}
              >
                {isLoading ? 'Scanning with Gemini...' : '⚡ Run Gemini Scan'}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            Get your free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>aistudio.google.com</a>. Keys remain securely on your local device.
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {/* Results Display */}
        {geminiResult && geminiResult.data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
            
            {/* Verdict Banner */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DOCUMENT TYPE DETECTED:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                  {geminiResult.data.documentType}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${getVerdictBadge(geminiResult.data.crossFieldLogic?.summaryVerdict)}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.8rem' }}>
                  {geminiResult.data.crossFieldLogic?.summaryVerdict?.replace(/_/g, ' ')}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Model: {geminiResult.modelUsed}
                </div>
              </div>
            </div>

            {/* Extracted Fields Table */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                📑 Gemini Multimodal OCR Field Extraction:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div><strong>Full Name:</strong> {geminiResult.data.extractedFields?.fullName || 'N/A'}</div>
                <div><strong>ID Number:</strong> <code>{geminiResult.data.extractedFields?.idNumber || 'N/A'}</code></div>
                <div><strong>DOB:</strong> {geminiResult.data.extractedFields?.dob || 'N/A'}</div>
                <div><strong>Gender:</strong> {geminiResult.data.extractedFields?.gender || 'N/A'}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Address:</strong> {geminiResult.data.extractedFields?.address || 'N/A'}</div>
              </div>
            </div>

            {/* Visual Tamper Findings */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '0.6rem' }}>
                🔬 Visual Tamper &amp; Pixel Assessment:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <li><strong>Tamper Status:</strong> <span style={{ color: geminiResult.data.visualTamperAssessment?.isTampered ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 'bold' }}>{geminiResult.data.visualTamperAssessment?.isTampered ? 'TAMPERING DETECTED' : 'CLEAN PIXELS'}</span> (Confidence: {geminiResult.data.visualTamperAssessment?.tamperConfidenceScore}%)</li>
                <li><strong>Primary Attack Type:</strong> {geminiResult.data.visualTamperAssessment?.primaryTamperType}</li>
                <li><strong>Font Metrology:</strong> {geminiResult.data.visualTamperAssessment?.fontMetrologyVerdict}</li>
                <li><strong>Biometric Portrait Notes:</strong> {geminiResult.data.visualTamperAssessment?.faceBiometricNotes}</li>
              </ul>
            </div>

            {/* Evidentiary Rationale */}
            <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-cyan)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                ⚖️ Legal Evidentiary Rationale:
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                {geminiResult.data.crossFieldLogic?.evidentiaryRationale}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
