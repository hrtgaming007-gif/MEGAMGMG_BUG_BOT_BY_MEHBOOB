const fs = require("fs");
const path = require("path");

module.exports = async function ({ conn, m, args, reply }) {
  try {
    const selfPath = path.join(__dirname, "media", "selfmode.json");
    if (!fs.existsSync(selfPath)) {
      return reply("⚠️ Bot is inactive. Ask the owner to activate with `.self`\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    const sender = m.sender.replace(/\D/g, "");
    const ownerNumber = "03257704203";

    if (sender !== ownerNumber) {
      return reply("🚫 Access Denied! Only the bot owner can change the bot bio.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (!args[0]) {
      return reply("❌ Please provide a bio.\nExample: `.setbio Mehboob is here!`");
    }

    const newBio = args.join(" ");
    await conn.updateProfileStatus(newBio);
    return reply(`✅ Bot bio successfully changed to:\n"${newBio}"\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);

  } catch (err) {
    console.error("❌ setbio error:", err);
    return reply("❌ Error while changing bot bio.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};