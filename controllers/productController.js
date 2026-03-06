const Product = require("../models/Product");

// ==============================
// Show All Categories
// ==============================
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.render("categories", { categories });
  } catch (err) {
    console.log(err);
    res.send("Error loading categories");
  }
};

// ==============================
// Show Products by Category
// ==============================
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.name;

    const products = await Product.find({
      category: categoryName
    });

    res.render("products-by-category", {
      products,
      category: categoryName
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading products");
  }
};

// ==============================
// Show Add Product Page
// ==============================
exports.getAddProduct = (req, res) => {
  res.render("add-product");
};

// ==============================
// Save New Product
// ==============================
exports.postAddProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    await Product.create({
      name,
      description,
      price,
      stock,
      category
    });

    res.redirect("/products");

  } catch (err) {
    console.log(err);
    res.send("Error adding product");
  }
};