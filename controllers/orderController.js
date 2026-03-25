const razorpay = require("../config/razorpay");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ============================
// Place Order
// ============================
exports.placeOrder = async (req, res) => {

  try {

    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect("/cart/checkout");
    }

    let totalAmount = 0;

    const orderItems = cart.map(item => {
      totalAmount += item.price * item.qty;

      return {
        productId: item.productId,
        quantity: item.qty,
        price: item.price
      };
    });

    // =========================
    // 💳 ONLINE PAYMENT FLOW
    // =========================
    if (req.body.paymentMethod === "Online") {

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // paise
        currency: "INR",
        receipt: "order_" + Date.now()
      });

      return res.render("shop/razorpay-checkout", {
        key: process.env.RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        order_id: razorpayOrder.id,
        address: req.body.address
      });
    }

    // =========================
    // 💵 COD FLOW (existing)
    // =========================

    // Reduce stock
    for (let item of cart) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.qty } }
      );
    }

    await Order.create({
      userId: req.session.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress: req.body.address,
      paymentMethod: "COD"
    });

    req.session.cart = [];

    res.redirect("/orders/my-orders");

  } catch (err) {
    console.log(err);
    res.send("Order error");
  }

};

// ============================
// Get My Orders
// ============================
exports.getMyOrders = async (req, res) => {
  try {
    const filter = { userId: req.session.user._id };

    // ✅ Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.render("orders/my-orders", { orders });

  } catch (err) {
    console.log(err);
    res.send("Error loading orders");
  }
};

// ============================
// Razorpay Payment Success
// ============================
exports.paymentSuccess = async (req, res) => {

  try {

    const cart = req.session.cart || [];

    let totalAmount = 0;

    const orderItems = cart.map(item => {
      totalAmount += item.price * item.qty;

      return {
        productId: item.productId,
        quantity: item.qty,
        price: item.price
      };
    });

    // ✅ Reduce stock
    for (let item of cart) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.qty } }
      );
    }

    // ✅ Save order AFTER payment success
    await Order.create({
      userId: req.session.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress: req.body.address,
      paymentMethod: "Online",
      status: "Pending"
    });

    // ✅ Clear cart
    req.session.cart = [];

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }

};

exports.trackOrder = async (req, res) => {

  const order = await Order.findById(req.params.id)
    .populate("items.productId");

  res.render("orders/track-order", { order });

};

// ============================
// Cancel Order
// ============================
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // ❌ Prevent cancel if delivered
    if (order.status === "Delivered") {
      return res.redirect("/orders/my-orders");
    }

    order.status = "Cancelled";
    await order.save();

    res.redirect("/orders/my-orders");

  } catch (err) {
    console.log(err);
    res.send("Cancel error");
  }
};