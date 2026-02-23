// middleware/authMiddleware.js

// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// Check if user is Admin
exports.isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "admin") {
    return res.send("Access Denied: Admins Only");
  }

  next();
};