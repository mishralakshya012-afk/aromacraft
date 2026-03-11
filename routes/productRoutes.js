const router = require("express").Router();
const productController = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");

// Admin routes
router.get("/add", isLoggedIn, isAdmin, productController.getAddProduct);
router.post("/add", isLoggedIn, isAdmin, productController.postAddProduct);

// Categories page
router.get("/categories", productController.getCategories);

// Products of a category
router.get("/category/:name", productController.getProductsByCategory);

// Single product page
router.get("/:id", productController.getProductDetails);

// Optional: show all products
router.get("/", productController.getProducts);

module.exports = router;