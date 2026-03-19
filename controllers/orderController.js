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

    // ✅ Reduce stock
    for (let item of cart) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.qty } }
      );
    }

    // ✅ Create Order with address + payment
    const order = await Order.create({
      userId: req.session.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress: req.body.address,
      paymentMethod: req.body.paymentMethod
    });

    // ✅ Clear cart
    req.session.cart = [];

    // ✅ Redirect instead of plain success page
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