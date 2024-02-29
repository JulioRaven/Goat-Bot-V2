.cmd install sd.js const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'sd',
    version: '1.0',
    author: 'MarianCross',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: 'Génération d’image plus réaliste et ultra réaliste.\n\nOptions de ratio:\n1 | 16:9\n2 | 4:3\n3 | 1:1\n4 | 9:16\n5 | 3:4'
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const permission = ["100095208485891"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        ❌ | Command "sd" currently unavailable buy premium to use the command.,
        event.threadID,
        event.messageID
      );
      return;
    }
    try {
      const info = args.join(' ');
      const parts = info.split('|').map(item => item.trim());
      const prompt = parts[0];
      const ratioIndex = parts[1] ? parseInt(parts[1]) : 3; // Par défaut, utilise le ratio carré (1:1)
      const ratios = ['16:9', '4:3', '1:1', '9:16', '3:4'];
      const ratio = ratios[ratioIndex - 1]; // Utilise le ratio spécifié, ou le ratio par défaut si non spécifié
      const modelParam = '5'; // Utilisation du cinquième modèle uniquement
      const apiUrl = https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${modelParam}&ratio=${ratio};

      await message.reply('Veuillez patienter, ça prend un instant... ⏳');

      const form = {};
      form.attachment = [];

      // Générer une image
      const response = await global.utils.getStreamFromURL(apiUrl);
      form.attachment.push(response);

      // Envoyer l'image générée
      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply("❎ | Désolé, il y a un problème avec l'API");
    }
  }
};
