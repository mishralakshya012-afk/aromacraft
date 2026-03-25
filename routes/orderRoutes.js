const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/payment-success", isLoggedIn, orderController.paymentSuccess);
// Place Order
router.post("/place-order", isLoggedIn, orderController.placeOrder);

// My Orders Page
router.get("/my-orders", isLoggedIn, orderController.getMyOrders);
 
router.get("/track/:id", isLoggedIn, orderController.trackOrder);

router.post("/cancel/:id", isLoggedIn, orderController.cancelOrder);

module.exports = router;