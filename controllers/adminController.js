const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ================= Dashboard =================
exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin/dashboard", {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Dashboard Error");
  }
};

// ================= View Products =================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin/products", { products });
  } catch (err) {
    console.log(err);
    res.status(500).send("Products Error");
  }
};

// ================= Show Add Product Page =================
exports.showAddProduct = (req, res) => {
  res.render("admin/add-product");
};

// ================= Add Product =================
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    await Product.create({
      name,
      price,
      category,
      description
    });

    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
    res.status(500).send("Add Product Error");
  }
};

// ================= Show Edit Product Page =================
exports.showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/edit-product", { product });

  } catch (err) {
    console.log(err);
    res.status(500).send("Edit Product Error");
  }
};

// ================= Update Product =================
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      category,
      description
    });

    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
    res.status(500).send("Update Product Error");
  }
};

// ================= Delete Product =================
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
    res.status(500).send("Delete Product Error");
  }
};

// ================= Orders =================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.render("admin/orders", { orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("Orders Error");
  }
};

// ================= Users =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/users", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Users Error");
  }
};