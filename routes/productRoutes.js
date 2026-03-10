const router = require("express").Router();
const productController = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");

console.log("PRODUCT ROUTES FILE LOADED");

// Admin routes
router.get("/add", isLoggedIn, isAdmin, productController.getAddProduct);
router.post("/add", isLoggedIn, isAdmin, productController.postAddProduct);

// Show all products
router.get("/", productController.getProducts);

// Dynamic route LAST
router.get("/category/:name", productController.getProductsByCategory);

module.exports = router;