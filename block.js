const fs = require("fs");
const path = require("path");

// 🧼 Clean number from JID
function getCleanNumber(jid) {
  return jid ? jid.replace(/\D/g, "") : null;
}

// 🔍 Resolve sender JID
function resolveSenderNumber(m, conn) {
  let senderJid =
    m.key?.participant ||
    m.participant ||
    m.message?.extendedTextMessage?.contextInfo?.participant ||
    m.sender ||
    (m.key?.fromMe && conn?.user?.id) ||
    m.key?.remoteJid;

  if (!senderJid && conn?.decodeJid) {
    try {
      senderJid = conn.decodeJid(m?.key?.remoteJid);
    } catch {
      senderJid = null;
    }
  }

  return getCleanNumber(senderJid);
}

module.exports = async function ({ conn, m, args, command, sender, reply, jid }) {
  try {
    const isGroup = jid.endsWith("@g.us");

    // 🔐 Read selfmode.json for owner info
    const configPath = path.join(__dirname, "media", "selfmode.json");
    if (!fs.existsSync(configPath)) {
      return reply("⚠️ *I'm waiting for my owner's `.self` command to activate authority.*\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(fs.readFileSync(configPath));
    } catch {
      return reply("❌ Error reading selfmode.json. File may be corrupted.");
    }

    const realOwner = jsonData.owner_sender;
    const senderNum = resolveSenderNumber(m, conn);
    if (senderNum !== realOwner) {
      return reply(`🚫 *Access Denied!*\n\nOnly the *REAL BOT OWNER* can use this command.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
    }

    if (!args[0]) return reply("❌ Please provide a number to block.\n\nExample: .block 923xxxxxx");

    const targetNum = args[0].replace(/\D/g, "");
    if (!targetNum) return reply("❌ Invalid number format.");

    const targetJid = `${targetNum}@s.whatsapp.net`;
    await conn.updateBlockStatus(targetJid, "block");

    reply(`✅ Successfully blocked: ${targetNum}\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
  } catch (err) {
    console.error("Block command error:", err);
    reply("❌ Something went wrong while blocking the number.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};