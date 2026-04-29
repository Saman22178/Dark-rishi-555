import React, { useState } from 'react';
import { Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getPairingCode = async () => {
    if (!phoneNumber) {
      setError('කරුණාකර දුරකථන අංකය ඇතුළත් කරන්න.');
      return;
    }

    setLoading(true);
    setError('');
    setPairingCode('');

    try {
      // ඔයාගේ Railway Backend URL එක මෙතනට සම්බන්ධ කර ඇත
      const response = await fetch('https://Dark-rishi-555-production.up.railway.app/api/pair', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok && data.code) {
        setPairingCode(data.code);
      } else {
        setError(data.error || 'කේතය ලබා ගැනීමට නොහැකි විය. නැවත උත්සාහ කරන්න.');
      }
    } catch (err) {
      setError('සර්වර් එකට සම්බන්ධ වීමට නොහැකි විය. පසුව උත්සාහ කරන්න.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-emerald-400">
              DARK RISHI
            </span>
            <span className="text-white ml-2">PANEL</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            WA Pairing Interface • Secure Connect
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <div className="w-20 h-20 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">
              Phone Number
            </label>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500">
                <Phone size={18} />
              </div>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="947xxxxxxxx"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-emerald-500/50 transition-all text-lg font-medium"
              />
            </div>

            <button
              onClick={getPairingCode}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>GENERATING...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>GET PAIRING CODE</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-red-200 text-sm font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Success/Pairing Code Display */}
            {pairingCode && (
              <div className="mt-8 animate-in zoom-in-95 duration-300">
                <div className="p-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl">
                  <div className="bg-[#0f0f0f] rounded-[calc(1rem-1px)] p-6 text-center border border-emerald-500/20">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle2 className="text-emerald-500" size={16} />
                      <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Your Code</span>
                    </div>
                    <div className="text-5xl font-black tracking-[0.2em] text-white py-2 font-mono">
                      {pairingCode}
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 text-xs mt-4 leading-relaxed">
                  මෙම කේතය ඔයාගේ WhatsApp Linked Devices කොටසේ <br/> "Link with phone number" තැනට ඇතුළත් කරන්න.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          &copy; 2026 DARK RISHI TECH • All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default App;
            
