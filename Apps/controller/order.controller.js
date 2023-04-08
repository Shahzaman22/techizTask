const {Order} = require('../model/order');
const { Product } = require('../model/product');

//Get All Orders
exports.get  = async (req,res) => {
  const order = await Order.find();
  res.json(order)
}

//CREATE ORDER
exports.create = async (req,res) => {
try {
  const {products , quantity , shippingAddress} = req.body;

  const product = await Product.findById(products)
  if(!product) return res.status(400).send('Product not found')

let total = 0;
for (let i = 0; i < products.length; i++) {
  const product = await Product.findById(products[i])
  if (!product) return res.status(400).send('Product not found')
  total += product.price * quantity[i]
}


 const order = await new Order ({
    products,
    user : req.user.userId,
    quantity,
    shippingAddress,
    total
  });
  await order.save()
  res.json(order)
} 
catch (error) {
  res.send(error.message)
}
}