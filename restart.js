const { exec } = require("child_process");

module.exports = async function ({ m, reply }) {
  try {
    const ownerNumber = "03257704203";
    const senderNum = m.sender.replace(/\D/g, "");

    if (senderNum !== ownerNumber) {
      return reply("🚫 Only *Mehboob* can restart the bot.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    reply("🔄 Restarting bot...\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");

    exec("pm2 restart all", (error, stdout, stderr) => {
      if (error) {
        console.error("❌ restart.js error:", error);
        return reply("❌ Failed to restart bot.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
      }
      reply("✅ Bot restarted successfully.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    });

  } catch (err) {
    console.error("❌ restart.js error:", err);
    reply("❌ Something went wrong while restarting bot.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};