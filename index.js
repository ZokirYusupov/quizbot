require('dotenv/config')
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Question = require('./models/question');


const PORT = process.env.PORT || 8080

//! core middlewares 
app.use(express.json());

async function bootstrap() {
  try {
    mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('Mongodb connected') )
    .catch( (e) => console.log('What is wrong error DB ',e) )


    const newQuestion = await Question.create({
      name: "Zokir qachon tugilgan?",
      qstn_lang: 'uz',
      qstn_level: 'A1',
      answer: [
        {
          text: 'Xato',
          correct: false
        },
        {
          text: 'Togri',
          correct: true
        },
        {
          text: 'Xato',
          correct: false
        },
        {
          text: 'Xato',
          correct: false
        }
      ]
    })
    // console.log(newQuestion);
    app.listen(PORT, () => {
      console.log(`Server run on port: ${PORT}`)
    })

  } catch (error) {
    console.log(error);
  }
}

bootstrap()

// use bot
require('./bot/bot')