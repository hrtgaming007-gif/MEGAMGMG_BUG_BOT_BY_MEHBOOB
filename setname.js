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
      return reply("🚫 Access Denied! Only the bot owner can change the bot name.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (!args[0]) {
      return reply("❌ Please provide a name.\nExample: `.setname Mehboob Bot`");
    }

    const newName = args.join(" ");
    await conn.updateProfileName(newName);
    return reply(`✅ Bot name successfully changed to: *${newName}*\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);

  } catch (err) {
    console.error("❌ setname error:", err);
    return reply("❌ Error while changing bot name.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};