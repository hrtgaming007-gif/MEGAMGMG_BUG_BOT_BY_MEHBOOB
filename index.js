// MEGATRON BOT — Full Starter Script (Pair Code Method)
// Works with @whiskeysockets/baileys v6.x

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  jidNormalizedUser
} = require("@whiskeysockets/baileys");
const P = require("pino");

// ====== CONFIG ======
const BOT_NAME = "MEGATRON_BOT";
const OWNER_NUMBER = "923257704203"; // just display in .owner

// ====== UTILS ======
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
const now = () => new Date();
const formatMs = (ms) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
};

const getText = (m) =>
  m?.message?.conversation ||
  m?.message?.extendedTextMessage?.text ||
  m?.message?.imageMessage?.caption ||
  m?.message?.videoMessage?.caption ||
  "";

const reply = (sock, jid, text, quoted) =>
  sock.sendMessage(jid, { text }, { quoted });

async function tagAll(sock, jid, text) {
  const meta = await sock.groupMetadata(jid);
  const participants = meta.participants || [];
  const mentions = participants.map(p => p.id);
  const body = (text || "Attention everyone!") + "\n\n" +
    participants.map(p => `• @${p.id.split("@")[0]}`).join("\n");
  await sock.sendMessage(jid, { text: body, mentions });
}

// ====== MAIN ======
async function startBot() {
  const startTime = Date.now();
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.clear();
  console.log(`
  __  __ _____ ____    _  _____ ____   ___  _   _   ____   ___ _____
 |  \\/  | ____/ ___|  / \\|_   _|  _ \\ / _ \\| \\ | | | __ ) / _ \\_   _|
 | |\\/| |  _|| |  _  / _ \\ | | | |_) | | | |  \\| | |  _ \\| | | || |
 | |  | | |__| |_| |/ ___ \\| | |  _ <| |_| | |\\  | | |_) | |_| || |
 |_|  |_|_____\\____/_/   \\_\\_| |_| \\_\\\\___/|_| \\_| |____/ \\___/ |_|
                                                  
🚀 Powered by MEHBOOB
📺 https://whatsapp.com/channel/0029VbBVS48FnSz45P3BVe1N
📡 Baileys: ${version.join(".")} (latest: ${isLatest})
`);

  const sock = makeWASocket({
    version,
    browser: [BOT_NAME, "Chrome", "1.0.0"],
    printQRInTerminal: false,       // ❌ disable QR
    auth: state,
    logger: P({ level: "silent" })
  });

  // 🔑 Pair code generate (first time only)
  if (!sock.authState.creds.registered) {
    const phoneNumber = OWNER_NUMBER; // apna number
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`🔑 Your Pair Code: ${code}`);
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (u) => {
    const { connection, lastDisconnect } = u;
    if (connection === "open") {
      console.log("✅ Connected! Pairing successful.");
    } else if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("❌ Connection closed.", { shouldReconnect });
      if (shouldReconnect) {
        await sleep(1500);
        startBot();
      } else {
        console.log("🔒 Logged out. Delete ./session and restart to relogin.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const m = messages[0];
    if (!m || m.key?.remoteJid === "status@broadcast") return;

    const from = m.key.remoteJid;
    const sender = jidNormalizedUser(m.key.participant || m.key.remoteJid);
    const isGroup = from.endsWith("@g.us");
    const body = getText(m).trim();
    const prefix = ".";
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/\s+/);
    const cmd = (args.shift() || "").toLowerCase();
    const argText = args.join(" ");

    try { await sock.sendPresenceUpdate("composing", from); } catch {}

    try {
      if (["menu", "help"].includes(cmd)) {
        const menu = `*${BOT_NAME} — Menu*
        
• .menu / .help  — Show this menu
• .ping          — Latency check
• .alive         — Bot status
• .owner         — Owner info
• .jid           — Show chat JID
• .echo <txt>    — Echo back your text
• .tagall [txt]  — Mention everyone (groups)

🔑 Login via Pair Code only — no QR scan needed.`;
        return reply(sock, from, menu, m);
      }

      if (cmd === "ping") {
        const t1 = Date.now();
        const sent = await sock.sendMessage(from, { text: "Pinging..." }, { quoted: m });
        const t2 = Date.now();
        return reply(sock, from, `🏓 Pong! ${t2 - t1} ms`, sent);
      }

      if (cmd === "alive") {
        return reply(
          sock,
          from,
          `✅ *${BOT_NAME} is alive!*
⏱ Uptime: ${formatMs(Date.now() - startTime)}
🕒 Time: ${now().toLocaleString()}
👤 Owner: wa.me/${OWNER_NUMBER}`,
          m
        );
      }

      if (cmd === "owner") {
        return reply(
          sock,
          from,
          `👤 *Owner Info*
• Number: wa.me/${OWNER_NUMBER}
• Commands are open — no owner lock.`,
          m
        );
      }

      if (cmd === "jid") {
        return reply(sock, from, `🔑 This chat JID:\n\`${from}\``, m);
      }

      if (cmd === "echo") {
        if (!argText) return reply(sock, from, "Usage: .echo <text>", m);
        return reply(sock, from, argText, m);
      }

      if (cmd === "tagall") {
        if (!isGroup) return reply(sock, from, "❗ This command works in groups only.", m);
        await tagAll(sock, from, argText);
        return;
      }

      return reply(sock, from, `Unknown command: ${prefix}${cmd}\nType .menu`, m);

    } catch (err) {
      console.error("Command error:", err);
      return reply(sock, from, "⚠️ Error executing command.", m);
    } finally {
      try { await sock.sendPresenceUpdate("paused", from); } catch {}
    }
  });
}

startBot();