const mongoose = require("mongoose");
const { Schema } = mongoose;

const Products = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productID: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("products", Products);
