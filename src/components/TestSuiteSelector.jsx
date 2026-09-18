import React, { useRef } from 'react';

export default function TestSuiteSelector({ testCases, activeCaseId, onSelectCase, onUploadFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="gov-scenario-strip">
      <div className="scenario-strip-header">
        <span className="scenario-strip-title">EVIDENCE TEST SCENARIO:</span>
      </div>

      <div className="scenario-chips-container">
        {testCases.map((tc) => {
          const isSelected = activeCaseId === tc.id;
          const isForcedTampered = tc.badge.includes('FORGED') || tc.badge.includes('TAMPERED') || tc.badge.includes('ATTACK');
          return (
            <button
              key={tc.id}
              type="button"
              className={`scenario-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCase(tc.id)}
            >
              <span className={`chip-badge ${isForcedTampered ? 'badge-forged' : 'badge-clean'}`}>
                {tc.badge}
              </span>
              <span className="chip-name">{tc.type}: {tc.name.split(':')[1]?.split('(')[0]?.trim() || tc.name}</span>
            </button>
          );
        })}
      </div>

      <div className="scenario-upload-action">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="gov-upload-chip-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          <span>📂</span> Upload Custom ID
        </button>
      </div>
    </div>
  );
}
