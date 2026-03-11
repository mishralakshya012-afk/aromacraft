const Product = require("../models/Product");

// Show categories
exports.getCategories = async (req, res) => {

  const categories = await Product.distinct("category");

  res.render("shop/categories", { categories });

};


// Products by category
exports.getProductsByCategory = async (req, res) => {

  const name = req.params.name;

  const products = await Product.find({
    category: { $regex: new RegExp("^" + name + "$", "i") }
  });

  res.render("shop/products-by-category", {
    products,
    category: name
  });

};

// Single product page
exports.getProductDetails = async (req, res) => {

  const product = await Product.findById(req.params.id);

  res.render("shop/product-details", { product });

};


// Show all products
exports.getProducts = async (req, res) => {

  const products = await Product.find();

  res.render("shop/products", { products });

};


// Add product page
exports.getAddProduct = (req, res) => {

  res.render("admin/add-product");

};


// Add product
exports.postAddProduct = async (req, res) => {

  const { name, price, category, description, stock } = req.body;

  const product = new Product({
    name,
    price,
    category,
    description,
    stock,
    image: req.file ? req.file.filename : null
  });

  await product.save();

  res.redirect("/products/categories");

};