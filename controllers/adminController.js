const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.dashboard = async (req, res) => {
  try {
    console.log("Dashboard controller reached");

    const totalUsers = await User.countDocuments();
    console.log("Users counted");

    const totalProducts = await Product.countDocuments();
    console.log("Products counted");

    const totalOrders = await Order.countDocuments();
    console.log("Orders counted");

    const orders = await Order.find();
    console.log("Orders fetched");

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    console.log("Revenue calculated");

    res.render("admin/dashboard", {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (err) {
    console.error("ADMIN DASHBOARD ERROR:", err);
    res.status(500).send(err.message);
  }
};