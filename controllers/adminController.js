const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);

    res.render("admin/dashboard", {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (err) {
    console.error(err);
    res.send("Admin dashboard error");
  }
};