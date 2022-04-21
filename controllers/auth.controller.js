const User = require("../models/user.model");
const { loginSchema, registerSchema } = require("../utils/validation");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.message);
  }

  let user = await User.findOne({ email: value.email });
  if (user) {
    return res.status(400).json({ msg: "email already in use" });
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  console.log(hashedPassword);

  res.status(201).send(hashedPassword);

  user = await User.create({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });
};

const login = async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);

  if (error) {
    return res.send(400).json(error);
  }

  //check if user is in database
  let user = await User.findOne({ email: value.email });

  //if user is not found
  if (!user) {
    return res.status(400).json({ msg: "invalid credentials" });
  }

  //   compare candidate's password with stored user's password
  const isMatch = await bcrypt.compare(value.password, user.password);

  //if passwords don't match
  if (!isMatch) {
    return res.status(400).json({ msg: "invalid credentials" });
  }
  res.status(200).json(user);
};

module.exports = {
  register,
  login,
};
