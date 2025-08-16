module.exports = async function ({ reply, m }) {
  const senderId = m.sender || m.key?.participant || m.participant || m.key?.remoteJid;
  const userJid = senderId || "Unknown";

  reply(`🆔 *Your WhatsApp ID:*
\`\`\`${userJid}\`\`\`

📺 *Channel:* https://whatsapp.com/channel/0029VbBVS48FnSz45P3BVe1N

> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
};