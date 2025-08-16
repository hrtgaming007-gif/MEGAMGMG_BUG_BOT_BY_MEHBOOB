const os = require("os");

module.exports = async function ({ reply }) {
  try {
    const uptimeInSeconds = process.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    const uptime = `${hours}h ${minutes}m ${seconds}s`;

    const message = `
╔═════『 🤖 𝗠𝗘𝗛𝗕𝗢𝗢𝗕 𝗕𝗢𝗧 ⚡ 』═════╗
📊 *Uptime:* ${uptime}
💻 *Platform:* ${os.platform()}
🖥 *CPU:* ${os.cpus()[0].model}
💿 *RAM:* ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
╚════════════════════════════╝

> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕
`;

    reply(message);
  } catch (err) {
    console.error("❌ runtime.js error:", err);
    reply("❌ Failed to get bot runtime info.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};