module.exports = async function ({ conn, m, isGroup, isBotAdmin, isAdmin, args, reply }) {
  if (!isGroup) return reply("❌ This command is only for groups.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  if (!isBotAdmin) return reply("❌ I need to be admin to kick members.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  if (!isAdmin) return reply("❌ Only group admins can use this command.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");

  let users = m.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (args.length > 0 && args[0].includes("@")) {
    let mentioned = args[0].replace("@", "") + "@s.whatsapp.net";
    users.push(mentioned);
  }

  if (users.length === 0) return reply("❌ Please mention a user to kick.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");

  for (let user of users) {
    await conn.groupParticipantsUpdate(m.chat, [user], "remove");
  }

  reply("✅ Member(s) kicked successfully.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
};