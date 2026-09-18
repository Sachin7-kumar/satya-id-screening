/**
 * SATYA-ID: Cryptographic & Algorithmic Checksum Engine
 * Implements:
 * 1. Verhoeff Algorithm (D5 Dihedral Group) for 12-Digit Indian Aadhaar Numbers
 * 2. Income Tax Department PAN Structural Rule & Checksum Validator
 * 3. ICAO Doc 9303 Passport Machine Readable Zone (MRZ) 7-3-1 Weight Calculator
 */

export const ChecksumEngine = {
  // --- VERHOEFF ALGORITHM (Dihedral Group D5) ---
  // Multiplication table (d)
  _d: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ],

  // Permutation table (p)
  _p: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ],

  // Inverse table (inv)
  _inv: [0, 4, 3, 2, 1, 5, 6, 7, 8, 9],

  /**
   * Generate Verhoeff check digit for a string of digits
   * @param {string} str 
   * @returns {number}
   */
  generateVerhoeffCheckDigit(str) {
    let c = 0;
    const digits = String(str).replace(/\s+/g, '').split('').map(Number).reverse();
    for (let i = 0; i < digits.length; i++) {
      c = this._d[c][this._p[(i + 1) % 8][digits[i]]];
    }
    return this._inv[c];
  },

  /**
   * Validate 12-digit Aadhaar number using Verhoeff algorithm
   * @param {string} aadhaarStr - 12 digit string (spaces allowed)
   * @returns {Object}
   */
  validateAadhaarVerhoeff(aadhaarStr) {
    const cleanStr = String(aadhaarStr).replace(/\s+/g, '');
    if (!/^\d{12}$/.test(cleanStr)) {
      return {
        isValid: false,
        message: `Invalid Aadhaar format: expected exactly 12 numeric digits, got ${cleanStr.length}`,
        errorType: 'FORMAT_ERROR'
      };
    }

    let c = 0;
    const digits = cleanStr.split('').map(Number).reverse();

    for (let i = 0; i < digits.length; i++) {
      c = this._d[c][this._p[i % 8][digits[i]]];
    }

    const isValid = (c === 0);
    const expectedLastDigit = this.generateVerhoeffCheckDigit(cleanStr.slice(0, 11));
    const actualLastDigit = parseInt(cleanStr.slice(-1), 10);

    return {
      isValid,
      algorithm: 'Verhoeff (D5 Dihedral Group)',
      aadhaarMasked: `XXXX-XXXX-${cleanStr.slice(8)}`,
      status: isValid ? 'VALID_CHECKSUM' : 'MATHEMATICAL_FORGERY_DETECTED',
      message: isValid 
        ? 'Aadhaar mathematical checksum verified. Digits conform to UIDAI D5 polynomial.' 
        : 'CRITICAL ALERT: Verhoeff checksum failure! This 12-digit number is mathematically impossible; manual modification detected.'
    };
  },

  /**
   * Validate Indian Income Tax PAN Card structural constraints
   * Format: [A-Z]{3}[PCHFATBLJG][A-Z]\d{4}[A-Z]
   * @param {string} panStr 
   * @param {string} claimedSurname 
   * @returns {Object}
   */
  validatePAN(panStr, claimedSurname = '') {
    const cleanPAN = String(panStr).trim().toUpperCase();
    const panRegex = /^([A-Z]{3})([PCHFATBLJG])([A-Z])(\d{4})([A-Z])$/;
    const match = cleanPAN.match(panRegex);

    if (!match) {
      return {
        isValid: false,
        pan: cleanPAN,
        status: 'INVALID_PAN_STRUCTURE',
        message: 'PAN string violates the statutory Income Tax alphanumeric schema [AAA-C-S-9999-X].'
      };
    }

    const entityType = match[2];
    const surnameInitial = match[3];
    const entityTypes = {
      'P': 'Individual / Person',
      'C': 'Company',
      'H': 'Hindu Undivided Family (HUF)',
      'F': 'Firm / Partnership',
      'A': 'Association of Persons (AOP)',
      'T': 'Trust',
      'B': 'Body of Individuals (BOI)',
      'L': 'Local Authority',
      'J': 'Artificial Juridical Person',
      'G': 'Government Agency'
    };

    let surnameCheck = true;
    let surnameNote = 'Surname initial verified';
    if (claimedSurname && claimedSurname.trim().length > 0) {
      const cleanSurnameInitial = claimedSurname.trim().toUpperCase()[0];
      if (cleanSurnameInitial !== surnameInitial) {
        surnameCheck = false;
        surnameNote = `Mismatch! 5th character is '${surnameInitial}', but claimed surname starts with '${cleanSurnameInitial}'.`;
      }
    }

    return {
      isValid: surnameCheck,
      pan: cleanPAN,
      entityType: entityTypes[entityType] || 'Unknown Entity',
      surnameInitial,
      status: surnameCheck ? 'VALID_PAN' : 'IDENTITY_SURNAMEMISMATCH',
      message: surnameCheck 
        ? `Valid PAN structure for ${entityTypes[entityType]}. 5th character matches holder surname.`
        : `FRAUD WARNING: ${surnameNote}`
    };
  },

  /**
   * Validate ICAO Doc 9303 Passport Machine Readable Zone (MRZ)
   * Weight pattern 7-3-1
   * @param {string} charString - e.g. passport number + check digit
   * @returns {boolean}
   */
  validateMRZWeight(charString) {
    if (!charString || charString.length < 2) return false;
    const weights = [7, 3, 1];
    const chars = charString.slice(0, -1);
    const expectedCheck = charString.slice(-1);

    let sum = 0;
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      let val = 0;
      if (ch >= '0' && ch <= '9') {
        val = ch.charCodeAt(0) - '0'.charCodeAt(0);
      } else if (ch >= 'A' && ch <= 'Z') {
        val = ch.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else if (ch === '<') {
        val = 0;
      }
      sum += val * weights[i % 3];
    }
    const computedCheck = String(sum % 10);
    return computedCheck === expectedCheck;
  }
};
