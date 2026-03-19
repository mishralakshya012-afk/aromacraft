const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// 🛒 View Cart Page
router.get("/", isLoggedIn, cartController.viewCart);

// 🛒 Checkout Page
router.get("/checkout", isLoggedIn, (req, res) => {
  res.render("shop/checkout", {
    cart: req.session.cart || []
  });
});

// Add to Cart
router.post("/add-to-cart/:id", isLoggedIn, cartController.addToCart);

// Increase / Decrease Quantity
router.post("/increase/:id", isLoggedIn, cartController.increaseQty);
router.post("/decrease/:id", isLoggedIn, cartController.decreaseQty);

// Remove Item
router.post("/remove/:id", isLoggedIn, cartController.removeItem);

// Clear Cart
router.post("/clear-cart", isLoggedIn, cartController.clearCart);

module.exports = router;