const fs = require("fs");
const path = require("path");

// 🔢 Clean number from JID
function getCleanNumber(jid) {
  return jid ? jid.replace(/\D/g, "") : null;
}

// 🔍 Resolve sender number
function resolveSenderNumber(m, conn) {
  let senderJid =
    m.sender ||
    m.key?.participant ||
    m.participant ||
    (m.key?.fromMe && conn?.user?.id) ||
    m.key?.remoteJid ||
    m.message?.extendedTextMessage?.contextInfo?.participant;

  if (!senderJid && conn?.decodeJid) {
    try {
      senderJid = conn.decodeJid(m?.key?.remoteJid);
    } catch {
      senderJid = null;
    }
  }

  return getCleanNumber(senderJid);
}

module.exports = async function ({ conn, m, reply, args, isGroup }) {
  try {
    // ❌ Block in groups — allow only in DM
    if (isGroup) {
      return reply("❌ This is a *DM-only* command. Please message the bot privately.");
    }

    const senderNum = resolveSenderNumber(m, conn);
    if (!senderNum) return reply("❌ Unable to identify the sender.");

    // 🔐 Owner check using selfmode.json
    const configPath = path.join(__dirname, "media/selfmode.json");

    // 📂 اگر فائل نہیں ہے تو بنائیں
    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(path.join(__dirname, "media"), { recursive: true });
      fs.writeFileSync(configPath, JSON.stringify({ owner_sender: "03257704203" }, null, 2));
      return reply("⚠️ *Bot was inactive.* Owner has been set to 𝗠𝗘𝗛𝗕𝗢𝗢𝗕 (03257704203) with `.self`\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(fs.readFileSync(configPath));
    } catch {
      return reply("❌ `selfmode.json` is missing or corrupted.");
    }

    const realOwner = jsonData.owner_sender;

    if (senderNum !== realOwner) {
      return reply(`😡 *You're NOT my OWNER!*\n\n🚫 *Access Denied to Auto Status System*\n\n👑 Only *𝗠𝗘𝗛𝗕𝗢𝗢𝗕* has access to this.`);
    }

    // ✅ Validate argument
    const toggle = args[0]?.toLowerCase();
    if (!["on", "off"].includes(toggle)) {
      return reply("👁️ *Usage:* `.autostatus on` or `.autostatus off`");
    }

    // ✅ Apply toggle
    global.autostatus = toggle === "on";
    return reply(`👁️ *Auto Status View is now ➜* *${toggle.toUpperCase()}*\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);

  } catch (err) {
    console.error("❌ AutoStatus Error:", err.message);
    return reply("❌ Something went wrong while toggling Auto Status View.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};