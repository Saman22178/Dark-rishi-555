import React, { useState } from 'react';
import { Phone, Send, Loader2, ShieldCheck } from 'lucide-react';

// මෙතනට ඔයාගේ KataBump සර්වර් එකේ IP/URL එක දෙන්න
const API_BASE_URL = "http://sftp.fr-node-59.katabump.com:3000"; 

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePairing = async () => {
    if (!phoneNumber) {
      setError('දුරකථන අංකය ඇතුළත් කරන්න.');
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
      setError('Browser එකේ Insecure content allow කර උත්සාහ කරන්න.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <h1 className="text-2xl font-black text-center mb-6">DARK RISHI BOT SETUP</h1>
        <div className="space-y-4">
          <input 
            type="text" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="947xxxxxxxx" 
            className="w-full bg-zinc-800 p-4 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handlePairing} 
            disabled={loading}
            className="w-full bg-blue-600 p-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18}/>}
            {loading ? 'WAITING...' : 'GET PAIRING CODE'}
          </button>
          {pairingCode && (
            <div className="mt-4 p-6 bg-zinc-800 rounded-2xl text-center border-2 border-dashed border-blue-500">
              <p className="text-xs text-zinc-400 mb-2 uppercase">Your Code</p>
              <span className="text-4xl font-mono font-bold text-blue-400 tracking-tighter">{pairingCode}</span>
            </div>
          )}
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
export default App;
