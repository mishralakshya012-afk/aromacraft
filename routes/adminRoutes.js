const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// use admin layout
router.use((req, res, next) => {
  res.locals.layout = "layouts/admin";
  next();
});

// Admin pages
router.get("/dashboard", adminController.getDashboard);
router.get("/products", adminController.getProducts);
router.get("/orders", adminController.getOrders);
router.get("/users", adminController.getUsers);
router.get("/add-product", adminController.getAddProduct);

module.exports = router;