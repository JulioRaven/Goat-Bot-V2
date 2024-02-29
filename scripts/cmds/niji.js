const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'niji',
    version: '1.0',
    author: 'MarianCross',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: Generateur d'images version anime / niji version 3/4/5
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const permission = ["100095208485891"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        ❌ | Command "niji" currently unavailable buy premium to use the command.,
        event.threadID,
        event.messageID
      );
      return;
    }
    try {
      const info = args.join(' ');
      const [prompt] = info.split('|').map(item => item.trim());
      const text = args.join(" ");
      if (!text) {
        return message.reply("❎ | Please provide a prompt");
      }
      const modelParam = '1'; // Utilisation du premier modèle uniquement
      const apiUrl = https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${modelParam};

      await message.reply('Patientez svp...⏳');

      const form = {};
      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);

      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('❎ | Sorry, API has a skill issue');
    }
  }
};
