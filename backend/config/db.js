const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/myparty`, {
      useNewUrlParser: true,
    });

    console.log('Conectado ao MongoDb');
  } catch (e) {
    console.log(`Erro: ${e}`);
  }
}

module.exports = main;
