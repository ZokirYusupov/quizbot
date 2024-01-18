const { bot } = require('../bot');
const User = require('../../models/user')
const start = async (msg) => {
  const chatId = msg.from.id;
  let checkUser = await User.findOne({chatId }).lean()

  if(!checkUser) {
    let newUser = new User({
      name: msg.from.first_name,
      chatId,
      status: true,
      action: 'request_contact'
    })

    await newUser.save()
    bot.sendMessage(
      chatId, 
      `Iltimos telefon raqamingizni share qiling`,
      {
        reply_markup: {
          keyboard: [
            [{
              text: "Telefon raqamingizni share qiling!",
              request_contact: true
            }]
          ],
          resize_keyboard: true,
        }
      }
      )
  } else {
    await User.findByIdAndUpdate(checkUser._id, {
      ...checkUser,
      action: 'menu'
    }, {new: true})
    bot.sendMessage(chatId, `Xoxlagan yo'nalishni tanlang , ${checkUser.admin ? 'admin' : checkUser.name}`,{
      reply_markup: {
        keyboard: [
          ['Ingliz', 'Rus', 'Koreys'],
          ['Turk', 'Ona tili'],
          ['Daturlash']
        ],
        resize_keyboard: true
      }
    })
  }
}

const requestContect = async (msg) => {
  const chatId = msg.from.id;
  if (msg.contact.phone_number) {
    let user = await User.findOne({chatId}).lean()
    user.phone = msg.contact.phone_number
    user.admin = msg.contact.phone_number == '+998937170417';
    user.action = 'menu'
    await User.findByIdAndUpdate(user._id, user, {new: true})

    bot.sendMessage(chatId, `Xoxlagan yo'nalishni tanlang , ${user.admin ? 'admin' : user.name}`,{
      reply_markup: {
        keyboard: [
          ['Ingliz', 'Rus', 'Koreys'],
          ['Turk', 'Ona tili'],
          ['Daturlash']
        ],
        resize_keyboard: true
      }
    })
  }
}

module.exports = {
  start,
  requestContect
}