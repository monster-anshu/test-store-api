const mongoose = require("mongoose");

// const mongoURI =
  // "mongodb://localhost:27017/API?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const mongoURI = process.env.DB
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo DB");
  });
};
module.exports = connectToMongo;
