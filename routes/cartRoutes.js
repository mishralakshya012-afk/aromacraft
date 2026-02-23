const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Add to Cart
router.post("/add-to-cart/:id", isLoggedIn, cartController.addToCart);

// View Cart
router.get("/checkout", isLoggedIn, cartController.viewCart);

// Increase / Decrease Quantity
router.post("/increase/:id", isLoggedIn, cartController.increaseQty);
router.post("/decrease/:id", isLoggedIn, cartController.decreaseQty);

// Remove Item
router.post("/remove/:id", isLoggedIn, cartController.removeItem);

// Clear Cart
router.post("/clear-cart", isLoggedIn, cartController.clearCart);

module.exports = router;