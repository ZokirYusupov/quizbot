const { Schema, model } = require('mongoose');

const Question = new Schema({
  name: String,
  qstn_level: String,
  qstn_lang: String,
  special: {
    type: Boolean,
    default: false
  },
  answer: [
    {
    text: String,
    correct: Boolean
    }
  ]
})

module.exports = model('Question', Question)