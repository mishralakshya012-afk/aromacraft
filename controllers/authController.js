const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==============================
// Show Register Page
// ==============================
exports.showRegister = (req, res) => {
  res.render("register");
};

// ==============================
// Handle Register
// ==============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.render("register", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", { error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    // Store minimal session data (not full object)
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    res.redirect("/products");

  } catch (err) {
    console.error(err);
    res.render("register", { error: "Registration failed" });
  }
};

// ==============================
// Show Login Page
// ==============================
exports.showLogin = (req, res) => {
  res.render("login");
};

// ==============================
// Handle Login
// ==============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid password" });
    }

    // Store minimal session info
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect("/products");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed" });
  }
};

// ==============================
// Logout
// ==============================
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/products");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
};