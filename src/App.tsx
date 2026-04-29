// App.tsx ඇතුළත fetch කරන කොටස මෙහෙම වෙන්න ඕනේ:

const getPairingCode = async () => {
    if (!phoneNumber) return alert("කරුණාකර අංකය ඇතුළත් කරන්න");
    
    setLoading(true);
    try {
        // මෙතනට ඔයාගේ Railway ලින්ක් එක දාන්න (උදා: https://bot-production.up.railway.app)
        const response = await fetch('https://RAILWAY_URL_HERE/api/pair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phoneNumber })
        });
        
        const data = await response.json();
        if (data.code) {
            setPairingCode(data.code);
        } else {
            alert("දෝෂයකි: " + (data.error || "නැවත උත්සාහ කරන්න"));
        }
    } catch (error) {
        alert("සර්වර් එකට සම්බන්ධ විය නොහැක");
    } finally {
        setLoading(false);
    }
};
          
