// controllers/adminController.js
const Product = require("../models/Product");

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard"); // layout applied automatically
};

exports.getProducts = (req, res) => {
  res.render("admin/products");
};

exports.getOrders = (req, res) => {
  res.render("admin/orders");
};

exports.getUsers = (req, res) => {
  res.render("admin/users");
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product");
};

exports.getEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.redirect("/admin/products");
    }

    res.render("admin/edit-product", { product });

  } catch (err) {
    console.log(err);
    res.redirect("/admin/products");
  }
};

exports.postEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, category } = req.body;

    await Product.findByIdAndUpdate(productId, {
      name,
      price,
      description,
      category
    });

    res.redirect("/admin/products");

  } catch (err) {
    console.log(err);
    res.redirect("/admin/products");
  }
};