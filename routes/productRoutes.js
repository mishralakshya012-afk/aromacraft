const router = require("express").Router();
const productController = require("../controllers/productController");
const { isAdmin } = require("../middleware/authMiddleware");

// View Products
router.get("/products", productController.getProducts);

// Admin Add Product
router.get("/add-product", isAdmin, productController.showAddProduct);
router.post("/add-product", isAdmin, productController.addProduct);

module.exports = router;