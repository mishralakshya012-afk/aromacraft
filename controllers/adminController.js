exports.getDashboard = (req, res) => {
  res.render("admin/dashboard", { layout: "layouts/admin" });
};

exports.getProducts = (req, res) => {
  res.render("admin/products", { layout: "layouts/admin" });
};

exports.getOrders = (req, res) => {
  res.render("admin/orders", { layout: "layouts/admin" });
};

exports.getUsers = (req, res) => {
  res.render("admin/users", { layout: "layouts/admin" });
};