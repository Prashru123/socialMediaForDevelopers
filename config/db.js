const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('DB CONNECTION IS SETUP');
  } catch (error) {
    console.log(error.message);
    //exit from the process
    process.exit(1);
  }
};

module.exports = connectDB;
