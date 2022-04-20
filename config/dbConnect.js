const mongoose = require("mongoose");

//create function to connect to the database
const dbConnect = async () => {
  try {
    //connecting to the database
    await mongoose.connect("mongodb://127.0.0.1:27017/shop");
    console.log("db connected successfully");
  } catch (error) {
    //throw error for debugging
    console.log(error);
    process.exit(1);
  }
};

module.exports = { dbConnect };
