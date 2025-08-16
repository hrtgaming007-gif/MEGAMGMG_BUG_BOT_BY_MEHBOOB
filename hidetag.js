module.exports = async function ({ conn, m, text, participants, senderNum, realOwner, reply }) {
  try {
    if (senderNum !== realOwner) {
      return reply("🚫 *Only the REAL OWNER can use this command.*\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    if (!text && !m.quoted) {
      return reply("❌ Please provide a message or reply to a message to hide tag.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
    }

    let messageContent = text ? text : "";
    let options = {};
    const groupMembers = participants.map(member => member.id);

    if (m.quoted) {
      let type = Object.keys(m.quoted.message)[0];
      let quotedMsg = m.quoted.message;

      if (type === "imageMessage") {
        options.image = quotedMsg.imageMessage;
        if (quotedMsg.imageMessage.caption) {
          messageContent = quotedMsg.imageMessage.caption;
        }
      } else if (type === "videoMessage") {
        options.video = quotedMsg.videoMessage;
        if (quotedMsg.videoMessage.caption) {
          messageContent = quotedMsg.videoMessage.caption;
        }
      } else if (type === "stickerMessage") {
        options.sticker = quotedMsg.stickerMessage;
      } else if (type === "documentMessage") {
        options.document = quotedMsg.documentMessage;
      } else if (type === "audioMessage") {
        options.audio = quotedMsg.audioMessage;
      } else if (type === "extendedTextMessage") {
        messageContent = quotedMsg.extendedTextMessage.text;
      }
    }// Add mentions to options
    options.mentions = groupMembers;

    // Send the message
    if (options.image) {
      await conn.sendMessage(m.chat, { image: options.image, caption: messageContent, mentions: groupMembers }, { quoted: m });
    } else if (options.video) {
      await conn.sendMessage(m.chat, { video: options.video, caption: messageContent, mentions: groupMembers }, { quoted: m });
    } else if (options.sticker) {
      await conn.sendMessage(m.chat, { sticker: options.sticker, mentions: groupMembers }, { quoted: m });
    } else if (options.document) {
      await conn.sendMessage(m.chat, { document: options.document, mimetype: options.document.mimetype, fileName: options.document.fileName, mentions: groupMembers }, { quoted: m });
    } else if (options.audio) {
      await conn.sendMessage(m.chat, { audio: options.audio, mimetype: options.audio.mimetype, ptt: true, mentions: groupMembers }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: messageContent, mentions: groupMembers }, { quoted: m });
    }

    reply("✅ Message sent with hidden tags.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  } catch (error) {
    console.error(error);
    reply("❌ Failed to send hidden tag message.\n\n> 𝗠𝗘𝗛𝗕𝗢𝗢𝗕");
  }
};