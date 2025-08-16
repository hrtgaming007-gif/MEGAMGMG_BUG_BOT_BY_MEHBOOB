module.exports = async function ({ sender, reply }) {
  try {
    const ownerNumber = "03257704203"; // Updated owner number
    const senderNum = sender.replace(/\D/g, "");

    if (senderNum !== ownerNumber) {
      return reply("🔒 Only Bot Owner can shut down the bot.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    reply("⚠️ SYSTEM SHUTDOWN INITIATED...\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    process.exit(0);

  } catch (err) {
    console.error("❌ systemkill error:", err);
    reply("❌ Error while shutting down bot.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};