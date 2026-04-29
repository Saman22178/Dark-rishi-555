const express = require('express');
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/pair', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const { state, saveCreds } = await useMultiFileAuthState('./session_data');
        const { version } = await fetchLatestBaileysVersion();

        const sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });

        // මද වේලාවක් රැඳී සිට pairing code එක ලබා ගැනීම
        setTimeout(async () => {
            try {
                const code = await sock.makeRegistrationCode(phone.trim());
                if (!res.writableEnded) {
                    res.status(200).json({ code });
                }
            } catch (err) {
                if (!res.writableEnded) {
                    res.status(500).json({ error: "Failed to generate code" });
                }
            }
        }, 3000);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
         
