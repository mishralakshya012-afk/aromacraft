const Product = require("../models/Product");


// Get all products
exports.getProducts = async (req, res) => {

  const products = await Product.find();

  res.render("shop/products", {
    products
  });

};


// Get products by category
exports.getProductsByCategory = async (req, res) => {

  const name = req.params.name;

  const products = await Product.find({ category: name });

  res.render("shop/products-by-category", {
    products
  });

};


// Show add product page
exports.getAddProduct = (req, res) => {

  res.render("admin/add-product");

};


// Handle add product
exports.postAddProduct = async (req, res) => {

  const { name, price, category, description } = req.body;

  const product = new Product({
    name,
    price,
    category,
    description
  });

  await product.save();

  res.redirect("/products");

};