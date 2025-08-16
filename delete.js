module.exports = async function ({ conn, m, reply, isGroup }) {
  try {
    if (!m.quoted) {
      return reply("❌ Please reply to the message you want to delete.\n\n_Example: .delete (reply to a message)_");
    }

    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender,
      },
    });

    reply("✅ Message deleted successfully!\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕\n📺 https://whatsapp.com/channel/0029VbBVS48FnSz45P3BVe1N");
  } catch (err) {
    console.error("❌ .delete command error:", err);
    reply("❌ Couldn't delete the message. Bot may not have permission.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};