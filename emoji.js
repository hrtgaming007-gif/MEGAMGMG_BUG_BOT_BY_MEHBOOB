module.exports = async function ({ conn, m, text, reply }) {
  try {
    if (!text) {
      return reply(`❌ Please enter an emoji to search.\n\nExample: .emoji 😎\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
    }

    const emojiMap = {
      "😀": "https://emojicdn.elk.sh/😀?style=apple",
      "😁": "https://emojicdn.elk.sh/😁?style=apple",
      "😂": "https://emojicdn.elk.sh/😂?style=apple",
      "🤣": "https://emojicdn.elk.sh/🤣?style=apple",
      "😃": "https://emojicdn.elk.sh/😃?style=apple",
      "😄": "https://emojicdn.elk.sh/😄?style=apple",
      "😅": "https://emojicdn.elk.sh/😅?style=apple",
      "😆": "https://emojicdn.elk.sh/😆?style=apple",
      "😉": "https://emojicdn.elk.sh/😉?style=apple",
      "😊": "https://emojicdn.elk.sh/😊?style=apple",
      "😋": "https://emojicdn.elk.sh/😋?style=apple",
      "😎": "https://emojicdn.elk.sh/😎?style=apple",
      "😍": "https://emojicdn.elk.sh/😍?style=apple",
      "😘": "https://emojicdn.elk.sh/😘?style=apple",
      "🥰": "https://emojicdn.elk.sh/🥰?style=apple",
      "😗": "https://emojicdn.elk.sh/😗?style=apple",
      "😙": "https://emojicdn.elk.sh/😙?style=apple",
      "😚": "https://emojicdn.elk.sh/😚?style=apple",
      "🙂": "https://emojicdn.elk.sh/🙂?style=apple",
      "🤗": "https://emojicdn.elk.sh/🤗?style=apple",
      "🤩": "https://emojicdn.elk.sh/🤩?style=apple"
    };const emoji = text.trim();
    const emojiUrl = emojiMap[emoji];

    if (!emojiUrl) {
      return reply(`❌ Emoji not found in database.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
    }

    await conn.sendMessage(
      m.chat,
      { image: { url: emojiUrl }, caption: `✅ Here is your emoji: ${emoji}\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕` },
      { quoted: m }
    );

  } catch (error) {
    console.error("❌ emoji command error:", error);
    reply(`❌ Failed to fetch emoji.\n\n🔔 Official Channel: https://whatsapp.com/channel/0029VbBVS48FnSz45P3BVe1N\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕`);
  }
};