module.exports = async function ({ reply }) {
  try {
    const rulesMessage = `
╔═════『 📜 BOT RULES 』═════╗
1️⃣ No spamming commands.
2️⃣ Don't flood the bot with messages.
3️⃣ Respect other members.
4️⃣ Avoid sending harmful content.
5️⃣ Follow group rules if in a group.
╚══════════════════════════╝

> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕
`;

    reply(rulesMessage);
  } catch (err) {
    console.error("❌ rules.js error:", err);
    reply("❌ Failed to load bot rules.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};