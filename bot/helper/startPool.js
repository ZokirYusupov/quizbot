const { bot } = require('../bot');
const Question = require('../../models/question')

const startPool = async (chatId) => {

  const questions = await Question.find().lean()

  console.log(questions);
 const answeer = bot.sendPoll(chatId, 'Zokir', ['red', 'blue'],
  {
    allows_multiple_answers: true,
    correct_option_id: 0
  })

  console.log(answeer);
}

module.exports = {
  startPool
}