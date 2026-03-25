const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  // ✅ NEW: Delivery Address
  deliveryAddress: {
    type: String,
    required: true
  },

  // ✅ NEW: Payment Method
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    default: "COD"
  },

  status: {
    type: String,
     enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);