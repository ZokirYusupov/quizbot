const { Schema, model } = require('mongoose');

const User = new Schema({
  name: String,
  chatId: Number,
  phone: String,
  admin: {
    type: Boolean,
    default: false
  },
  action: String,
  userLevel: {
    type: String,
    default: 'unknown'
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = model('User', User)