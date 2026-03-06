const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middleware/authMiddleware");

// Dashboard
router.get("/dashboard", isAdmin, adminController.dashboard);

// Products
router.get("/products", isAdmin, adminController.getProducts);
router.get("/products/add", isAdmin, adminController.showAddProduct);
router.post("/products/add", isAdmin, adminController.addProduct);

// Edit Product
router.get("/products/edit/:id", isAdmin, adminController.showEditProduct);
router.post("/products/edit/:id", isAdmin, adminController.updateProduct);

// Delete Product
router.get("/products/delete/:id", isAdmin, adminController.deleteProduct);

// Orders
router.get("/orders", isAdmin, adminController.getOrders);

// Users
router.get("/users", isAdmin, adminController.getUsers);

module.exports = router;