const router = require("express").Router();
const authController = require("../controllers/authController");

// ==============================
// Show Pages
// ==============================
router.get("/register", authController.showRegister);
router.get("/login", authController.showLogin);

// ==============================
// Handle Forms
// ==============================
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// ==============================
// Logout (POST for security)
// ==============================
router.post("/logout", authController.logoutUser);

module.exports = router;