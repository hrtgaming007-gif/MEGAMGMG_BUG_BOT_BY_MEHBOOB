module.exports = async function ({ conn, m, isGroup, reply, jid }) {
  try {
    if (!isGroup) return reply("❌ Group only command.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");

    await conn.groupRevokeInvite(jid);
    reply("✅ Group invite link has been revoked successfully.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    
  } catch (err) {
    console.error("❌ revoke.js error:", err);
    reply("❌ Failed to revoke group link.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};