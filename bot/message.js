const { bot } = require('./bot');
const { start, requestContect } = require('./helper/start')
const { startPool } = require('./helper/startPool')
const User = require('../models/user')
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const user = await User.findOne({chatId}).lean()
  if(text == '/start') {
    start(msg)
  }

  if(user) {
    const chatId = user.chatId;
    if(user.action == 'request_contact' && !user.phone) {
      requestContect(msg)
    }

    if(text == 'Ingliz') {
      bot.sendMessage(chatId, 'Hozir biz sizning ingliz tili darajangizni aniqlash uchun test topshirishingiz kerak!',
      {
        reply_markup: {
          keyboard: [
            [{
              text: "Testni boshlash"
            }]
          ],
          resize_keyboard: true,
        }
      })
    }
    if(text == 'Testni boshlash') {
      startPool(chatId)
      // bot.sendPoll(chatId, 'Whats is your name', ['reg','rf'], {
      //   is_anonymous: false,
      //   allows_multiple_answers: true
      // })
    }
  }

  
})