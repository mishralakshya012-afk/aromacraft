const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Place Order
exports.placeOrder = async (req, res) => {

  try {

    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect("/cart/checkout");
    }

    let totalAmount = 0;

    for (let item of cart) {

      totalAmount += item.price * item.qty;

      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.qty } }
      );

    }

    await Order.create({
      userId: req.session.user._id,
      totalAmount
    });

    req.session.cart = [];

    res.render("shop/order-success");

  } catch (err) {
    console.log(err);
    res.send("Order error");
  }

};