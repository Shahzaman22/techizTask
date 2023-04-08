const { Product, schema } = require("../model/product");
const axios = require("axios");

//GET PRODUCTS
exports.get = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    const myProducts = await Product.find({});

    const response = await axios.get(`https://fakestoreapi.com/products`);

    const products = [...response.data, ...myProducts];

    const total = products.reduce((acc, product) => acc + product.price, 0);

    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({ products: paginatedProducts, total });
  } catch (error) {
    res.send(error.message);
  }
};

//Add new products
exports.create = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const { title, price, description, category } = req.body;
    const image = req.file.filename;

    const response = await axios.post("https://fakestoreapi.com/products", {
      title,
      price,
      description,
      image,
      category,
    });

    const product = await Product.create({
      title,
      price,
      description,
      image,
      category,
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
