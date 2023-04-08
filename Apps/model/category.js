const mongoose = require('mongoose');
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema, 'Category');

const schema = Joi.object({
  name : Joi.string().min(5).max(255),
  desc : Joi.string().min(5).max(255),
}) 

exports.schema = schema;
exports.Category = Category;