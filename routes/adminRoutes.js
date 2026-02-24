const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard", isAdmin, adminController.dashboard);

module.exports = router;