const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const {
    createEchoHandler,
    createNotificationServerHandler,
    createTierHandler,
} = require('./handlers');

const TOKEN = process.env.TELEGRAM_TOKEN;
const options = {
    polling: true
  };
const bot = new TelegramBot(TOKEN, options);

bot.onText(/\/echo (.+)/, createEchoHandler(bot));
bot.onText(/\/tie (.+)/, createTierHandler(bot));

http.createServer(createNotificationServerHandler(bot)).listen(process.env.PORT);
