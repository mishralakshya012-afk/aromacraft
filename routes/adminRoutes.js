// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin layout
router.use((req, res, next) => {
  res.locals.layout = "layouts/admin";
  next();
});

// ------------------------
// Middleware: Protect Admin Routes
// ------------------------
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.redirect("/auth/login");
}

// Admin pages
router.get("/dashboard", isAdmin, adminController.getDashboard);
router.get("/products", isAdmin, adminController.getProducts);
router.get("/orders", isAdmin, adminController.getOrders);
router.post("/update-status/:id", isAdmin, adminController.updateStatus);
router.get("/users", isAdmin, adminController.getUsers);
router.get("/add-product", isAdmin, adminController.getAddProduct);
router.get("/edit-product/:id", isAdmin, adminController.getEditProduct);
router.post("/edit-product/:id", isAdmin, adminController.postEditProduct);
router.get("/delete-product/:id", isAdmin, adminController.deleteProduct);
module.exports = router;