const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Place Order
router.post("/place-order", isLoggedIn, orderController.placeOrder);

// My Orders Page
router.get("/my-orders", isLoggedIn, orderController.getMyOrders);

module.exports = router;