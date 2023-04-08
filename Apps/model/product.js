const mongoose = require("mongoose");
const Joi = require("joi");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema, "Product");

const schema = Joi.object({
  title: Joi.string().min(5).max(255),
  price: Joi.string(),
  description: Joi.string().min(5).max(255),
  image: Joi.string().min(10).max(15),
  category: Joi.string().min(1).max(255),
});

exports.schema = schema;
exports.Product = Product;
