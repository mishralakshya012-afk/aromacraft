// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login page
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Register page
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// Logout
router.get("/logout", authController.logout);

module.exports = router;