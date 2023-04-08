const { Category, schema } = require("../model/category");
const axios = require("axios");

//Get All Categories
exports.get = async (req, res) => {
  const {error} = schema.validate(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
);

  const category = response.data;
  res.json(category);
};

//Create Category
exports.create = async (req,res) => {
  const {error} = schema.validate(req.body)
  if (error) return res.status(404).send(error.details[0].message)

 const category = await new Category(req.body)
 await category.save()
 res.json(category)
}

