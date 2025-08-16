const fs = require("fs");
const path = require("path");

module.exports = async function ({ args, m, reply }) {
  try {
    const selfPath = path.join(__dirname, "media", "selfmode.json");
    const ownerNumber = "03257704203";

    // اگر فائل موجود نہیں ہے تو ڈیفالٹ بنائیں
    if (!fs.existsSync(selfPath)) {
      fs.writeFileSync(selfPath, JSON.stringify({ enabled: false, owner_sender: ownerNumber }, null, 2));
    }

    let selfData;
    try {
      selfData = JSON.parse(fs.readFileSync(selfPath, "utf-8"));
    } catch {
      selfData = { enabled: false, owner_sender: ownerNumber };
    }

    // مالک چیک
    const senderNum = m.sender.replace(/\D/g, "");
    if (senderNum !== ownerNumber) {
      return reply("🚫 Only *Mehboob* can use `.self` or `.public` commands.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (!args[0]) {
      return reply("❌ Usage: `.self` or `.public`\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    const mode = args[0].toLowerCase();
    if (mode === "self") {
      selfData.enabled = true;
      selfData.owner_sender = ownerNumber;
      fs.writeFileSync(selfPath, JSON.stringify(selfData, null, 2));
      return reply("✅ Bot is now in *Self Mode* (Owner only)\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (mode === "public") {
      selfData.enabled = false;
      selfData.owner_sender = ownerNumber;
      fs.writeFileSync(selfPath, JSON.stringify(selfData, null, 2));
      return reply("✅ Bot is now in *Public Mode* (Everyone can use)\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    return reply("❌ Invalid option. Use `.self` or `.public`\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");

  } catch (err) {
    console.error("❌ self.js error:", err);
    reply("❌ Something went wrong while toggling self/public mode.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};