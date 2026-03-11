const Product = require("../models/Product");

// Add to Cart
exports.addToCart = async (req, res) => {

  const productId = req.params.id;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const cart = req.session.cart;

  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.qty += 1;
  } else {

    const product = await Product.findById(productId);

    cart.push({
      productId: productId,
      name: product.name,
      price: product.price,
      qty: 1
    });

  }

res.redirect(req.get("Referer") || "/products/categories");

};


// View Cart
exports.viewCart = (req, res) => {

  const cart = req.session.cart || [];

  res.render("shop/cart", {
    cart
  });

};

// Increase Quantity
exports.increaseQty = (req, res) => {

  const id = req.params.id;
  const cart = req.session.cart;

  const item = cart.find(p => p.productId === id);

  if (item) item.qty += 1;

  res.redirect("/cart/checkout");

};


// Decrease Quantity
exports.decreaseQty = (req, res) => {

  const id = req.params.id;
  const cart = req.session.cart;

  const item = cart.find(p => p.productId === id);

  if (item && item.qty > 1) {
    item.qty -= 1;
  }

  res.redirect("/cart/checkout");

};


// Remove Item
exports.removeItem = (req, res) => {

  const id = req.params.id;

  req.session.cart = req.session.cart.filter(
    item => item.productId !== id
  );

  res.redirect("/cart/checkout");

};


// Clear Cart
exports.clearCart = (req, res) => {

  req.session.cart = [];

  res.redirect("/cart/checkout");

};