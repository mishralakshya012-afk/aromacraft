const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Show Register Page
exports.showRegister = (req, res) => {
  res.render("register");
};

// Handle Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Registration error");
  }
};

// Show Login Page
exports.showLogin = (req, res) => {
  res.render("login");
};

// Handle Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invalid password");
    }

    req.session.user = user;
    res.redirect("/products");
  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};