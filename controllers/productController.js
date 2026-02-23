const Product = require("../models/Product");

// Show All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (err) {
    console.log(err);
    res.send("Error loading products");
  }
};

// Show Add Product Page (Admin)
exports.showAddProduct = (req, res) => {
  res.render("addProduct");
};

// Handle Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    await Product.create({
      name,
      price,
      stock
    });

    res.redirect("/products");
  } catch (err) {
    console.log(err);
    res.send("Error adding product");
  }
};