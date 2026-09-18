// SATYA-ID: Web Speech API Automated Forensic Briefing Engine

class CyberSpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
  }

  speakVerdict(report, onStart, onEnd) {
    if (!this.synth) return;

    this.synth.cancel(); // Stop any active speech

    const trustScore = report?.trustScore || 100;
    const docType = report?.testCase?.type || 'Document';
    const algoStatus = report?.algoResult?.isValid ? 'passed' : 'violated mathematical checksums';
    const elaStatus = report?.elaResult?.isSuspicious ? 'compression anomalies detected' : 'clean compression matrix';

    let verdictText = '';
    if (trustScore >= 80) {
      verdictText = `SATYA-ID Automated Verification Complete. ${docType} verified as Authentic with a Trust Score of ${trustScore} percent. All mathematical checksums and compression physics conform to statutory standards.`;
    } else if (trustScore >= 50) {
      verdictText = `SATYA-ID Warning. ${docType} flagged as Suspect with a Trust Score of ${trustScore} percent. Minor typographical variance or re-compression artifacts detected. Secondary physical inspection advised.`;
    } else {
      verdictText = `SATYA-ID Critical Alert! High confidence forgery detected for ${docType}. Trust Score is ${trustScore} percent. ${algoStatus}, and ${elaStatus}. Evidence recorded under Bharatiya Sakshya Adhiniyam 2023.`;
    }

    const utterance = new SpeechSynthesisUtterance(verdictText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a crisp English voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Zira')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const speechEngine = new CyberSpeechEngine();
