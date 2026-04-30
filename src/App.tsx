import React, { useState } from 'react';
import { Phone, Send, Loader2, ShieldCheck, Copy, CheckCircle2 } from 'lucide-react';

// ඔයා ලබාදුන් නිවැරදි URL එක මෙන්න
const API_BASE_URL = "http://sftp.fr-node-59.katabump.com:3000"; 

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePairing = async () => {
    if (!phoneNumber) {
      setError('කරුණාකර දුරකථන අංකය ඇතුළත් කරන්න.');
      return;
    }
    setLoading(true);
    setError('');
    setPairingCode('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/pair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        setPairingCode(data.code);
      } else {
        setError(data.error || 'කේතය ලබාගත නොහැක.');
      }
    } catch (err) {
      setError('සම්බන්ධ වීමට නොහැක. කරුණාකර Browser settings වල Insecure Content "Allow" කරන්න.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (pairingCode) {
      navigator.clipboard.writeText(pairingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans text-white">
      <div className="max-w-md w-full bg-[#161616] rounded-3xl shadow-2xl border border-blue-500/10 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20 rotate-3">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">
            DARK <span className="text-blue-500">RISHI</span>
          </h1>
          <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1 font-bold">WhatsApp Pairing Panel</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 w-5 h-5" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="947xxxxxxxx"
                className="w-full bg-[#202020] border border-transparent rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handlePairing}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? 'GENERATING...' : 'GET PAIRING CODE'}
          </button>

          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <p className="text-red-400 text-xs text-center font-medium">{error}</p>
            </div>
          )}

          {pairingCode && (
            <div className="mt-4 p-8 bg-[#0a0a0a] rounded-3xl border border-blue-500/20 text-center relative group">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Your Pairing Code</p>
              <span className="text-5xl font-black text-blue-400 tracking-[0.2em]">{pairingCode}</span>
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 text-gray-600 hover:text-blue-400 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
        
        <p className="text-center text-gray-700 text-[9px] mt-10 font-bold tracking-widest uppercase">
          Developed by Dark Rishi Tech
        </p>
      </div>
    </div>
  );
}

export default App;
