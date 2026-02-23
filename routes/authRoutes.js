const router = require("express").Router();
const authController = require("../controllers/authController");

// Show Pages
router.get("/register", authController.showRegister);
router.get("/login", authController.showLogin);

// Handle Forms
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Logout
router.get("/logout", authController.logoutUser);

module.exports = router;