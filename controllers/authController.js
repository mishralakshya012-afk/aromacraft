// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Show login page
exports.getLogin = (req, res) => {
  res.render("auth/login");
};

// Show register page
exports.getRegister = (req, res) => {
  res.render("auth/register");
};

// Handle login
exports.postLogin = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("auth/login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("auth/login", { error: "Incorrect password" });
    }

    req.session.user = user;

    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    res.redirect("/");

  } catch (err) {
    console.log(err);
    res.render("auth/login", { error: "Login error" });
  }

};
// Handle register
exports.postRegister = (req, res) => {
  // TODO: Add real DB registration logic
  req.session.user = { name: "Demo User", role: "user" };
  res.redirect("/");
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};