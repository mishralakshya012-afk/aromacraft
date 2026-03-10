// Show login page
exports.getLogin = (req, res) => {
  res.render("auth/login");
};

// Show register page
exports.getRegister = (req, res) => {
  res.render("auth/register");
};

// Handle login
exports.postLogin = (req, res) => {
  req.session.user = {
    name: "Demo User",
    role: "user"
  };

  res.redirect("/");
};

// Handle register
exports.postRegister = (req, res) => {
  req.session.user = {
    name: "Demo User",
    role: "user"
  };

  res.redirect("/");
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};