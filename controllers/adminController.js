const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// ================= DASHBOARD =================
exports.getDashboard = async (req, res) => {

  try {

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach(order => {
      totalRevenue += order.totalAmount || 0;
    });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId");

    const formattedOrders = recentOrders.map(order => ({
      _id: order._id,
      user: order.userId ? order.userId.name : "Unknown",
      total: order.totalAmount,
      status: order.status || "Placed"
    }));

    res.render("admin/dashboard", {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders: formattedOrders
    });

  } catch (err) {
    console.log(err);
    res.send("Dashboard Error");
  }

};

// ================= PRODUCTS =================
exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.render("admin/products", { products });

  } catch (err) {
    console.log(err);
  }

};

// ================= ORDERS =================
exports.getOrders = async (req, res) => {

  try {

    const ordersData = await Order.find().populate("userId");

    const orders = ordersData.map(order => ({
      user: order.userId ? order.userId.name : "Unknown",
      total: order.totalAmount
    }));

    res.render("admin/orders", { orders });

  } catch (err) {
    console.log(err);
  }

};

// ================= USERS =================
exports.getUsers = async (req, res) => {

  try {

    const users = await User.find();

    res.render("admin/users", { users });

  } catch (err) {
    console.log(err);
  }

};

// ================= ADD PRODUCT =================
exports.getAddProduct = (req, res) => {

  res.render("admin/add-product");

};

// ================= EDIT PRODUCT =================
exports.getEditProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    res.render("admin/edit-product", { product });

  } catch (err) {
    console.log(err);
    res.redirect("/admin/products");
  }

};

exports.postEditProduct = async (req, res) => {

  try {

    const { name, price, description, category } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      category
    });

    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
  }

};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
  }

};