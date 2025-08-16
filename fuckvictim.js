module.exports = async function ({ conn, m, text, senderNum, realOwner, reply }) {
  try {
    if (senderNum !== realOwner) {
      return reply("🚫 Only the REAL OWNER can use this command.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (!text) {
      return reply("❌ Please provide a target number or mention a user.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    const targetNumber = text.replace(/[^0-9]/g, "");
    if (!targetNumber) {
      return reply("❌ Invalid number format.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    const targetJid = `${targetNumber}@s.whatsapp.net`;

    // Simulating an "attack"
    reply(`🚀 Initiating attack on ${targetNumber}...\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);

    const attackMessages = [
      "🔥 You have been targeted!",
      "💣 This is just a prank!",
      "😂 Don't take it seriously!",
      "⚡ System overload incoming...",
      "📢 Shout out to 𝗠𝗘𝗛𝗕𝗢𝗢𝗕!"
    ];for (let i = 0; i < attackMessages.length; i++) {
      await conn.sendMessage(targetJid, { text: `${attackMessages[i]}\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕` });
    }

    reply(`✅ Attack on ${targetNumber} completed successfully.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
  } catch (error) {
    console.error("❌ fuckvictim command error:", error);
    reply("❌ Failed to execute the attack.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};