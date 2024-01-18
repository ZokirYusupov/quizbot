const Telegram_Bot = require('node-telegram-bot-api');
const bot = new Telegram_Bot(process.env.TOKEN, {
  polling: true,
});

module.exports = {
  bot
}

// use messages
require('./message')