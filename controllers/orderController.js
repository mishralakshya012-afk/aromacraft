const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.send("Cart is empty");
    }

    let totalAmount = 0;

    for (let item of cartItems) {
      totalAmount += item.productId.price * item.quantity;

      // Reduce stock
      await Product.updateOne(
        { _id: item.productId._id },
        { $inc: { stock: -item.quantity } }
      );
    }

    await Order.create({
      userId,
      totalAmount
    });

    // Clear cart
    await Cart.deleteMany({ userId });

    res.send("✅ Order placed successfully");
  } catch (err) {
    console.log(err);
    res.send("Order error");
  }
};