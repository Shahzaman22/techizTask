const bcrypt = require("bcrypt");
const { User, schema } = require("../model/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//CREATE USER
exports.create = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User already registered with that Email");

  const { email, username, password, phone, role } = req.body;
  try {
    const response = await axios.post("https://fakestoreapi.com/users", {
      email,
      username,
      password,
      phone,
      role,
    });

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.json(error.message);
  }
};

//Login USER
exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  let isPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isPassword) {
    return res.status(400).send("INVALID PASSWORD");
  }

  const token = jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.PRIVATE_KEY
  );
  return res.json({ token: token, msg: "Login Successfully" });
};
