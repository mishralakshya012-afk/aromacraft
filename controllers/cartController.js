const Cart = require("../models/Cart");

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const productId = req.params.id;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      await Cart.updateOne(
        { _id: existingItem._id },
        { $inc: { quantity: 1 } }
      );
    } else {
      await Cart.create({
        userId,
        productId,
        quantity: 1
      });
    }

    res.redirect("/products");
  } catch (err) {
    console.log(err);
    res.send("Add to cart error");
  }
};

// View Cart
exports.viewCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.session.user._id })
      .populate("productId");

    res.render("checkout", { items });
  } catch (err) {
    console.log(err);
    res.send("Cart load error");
  }
};

// Increase Quantity
exports.increaseQty = async (req, res) => {
  try {
    await Cart.updateOne(
      { _id: req.params.id },
      { $inc: { quantity: 1 } }
    );
    res.redirect("/checkout");
  } catch (err) {
    console.log(err);
    res.send("Increase error");
  }
};

// Decrease Quantity
exports.decreaseQty = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (item.quantity > 1) {
      await Cart.updateOne(
        { _id: req.params.id },
        { $inc: { quantity: -1 } }
      );
    } else {
      await Cart.deleteOne({ _id: req.params.id });
    }

    res.redirect("/checkout");
  } catch (err) {
    console.log(err);
    res.send("Decrease error");
  }
};

// Remove Item
exports.removeItem = async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.id });
    res.redirect("/checkout");
  } catch (err) {
    console.log(err);
    res.send("Remove error");
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.session.user._id });
    res.redirect("/checkout");
  } catch (err) {
    console.log(err);
    res.send("Clear cart error");
  }
};