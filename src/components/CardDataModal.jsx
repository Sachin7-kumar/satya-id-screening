import React, { useState, useEffect } from 'react';

export default function CardDataModal({ isOpen, onClose, currentTestCase, onSaveData }) {
  const [formData, setFormData] = useState({
    docType: 'Aadhaar Card',
    fullName: '',
    idNumber: '',
    dob: '',
    gender: 'Male',
    address: ''
  });

  useEffect(() => {
    if (currentTestCase && currentTestCase.data) {
      const d = currentTestCase.data;
      setFormData({
        docType: currentTestCase.type || 'Aadhaar Card',
        fullName: d.fullName || '',
        idNumber: d.idNumber || '',
        dob: d.dob || '',
        gender: d.gender || 'Male',
        address: d.address || ''
      });
    }
  }, [currentTestCase, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetNoData = () => {
    setFormData({
      docType: 'Unclassified Document (No Data Given)',
      fullName: 'NOT PROVIDED / NO DATA GIVEN',
      idNumber: 'NOT PROVIDED',
      dob: 'NOT SPECIFIED',
      gender: 'NOT SPECIFIED',
      address: 'NOT SPECIFIED / JURISDICTION UNRECORDED'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(formData);
    onClose();
  };

  return (
    <div className="modal-overlay active">
      <div className="cert-modal-dialog" style={{ maxWidth: '580px', padding: '1.75rem' }}>
        <button onClick={onClose} className="cert-close-btn" title="Close">&times;</button>
        
        <div style={{ borderBottom: '2px solid #0B3C5D', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, color: '#0B3C5D', fontSize: '1.1rem', fontWeight: 800 }}>
            ✏️ Cardholder Particulars &amp; Identity Data
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.74rem', color: '#64748B' }}>
            Modify live cardholder particulars or mark record as "No Data Given" for forensic evaluation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Document Classification:
              </label>
              <select
                name="docType"
                value={formData.docType}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              >
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID (EPIC)">Voter ID (EPIC)</option>
                <option value="Unclassified Document (No Data Given)">Unclassified / No Data Given</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Identification / Card Number:
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="e.g. 2384 9102 4856 or NOT PROVIDED"
                style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              Cardholder Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rajesh Kumar Sharma or NOT PROVIDED"
              style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Date of Birth:
              </label>
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="DD/MM/YYYY or NOT SPECIFIED"
                style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Gender:
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Male / Female / NOT SPECIFIED"
                style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              Registered Address / Jurisdiction:
            </label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Official address or NOT SPECIFIED"
              style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
            <button
              type="button"
              onClick={handleSetNoData}
              className="gov-btn gov-btn-secondary"
              style={{ fontSize: '0.74rem', color: '#B91C1C', borderColor: '#FCA5A5', background: '#FEF2F2' }}
              title="Quickly clear all fields to 'No Data Given'"
            >
              🚫 Set as "No Data Given"
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={onClose} className="gov-btn gov-btn-secondary" style={{ fontSize: '0.74rem' }}>
                Cancel
              </button>
              <button type="submit" className="gov-btn gov-btn-primary" style={{ fontSize: '0.74rem' }}>
                ✓ Save &amp; Update Record
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
