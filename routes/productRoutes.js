const router = require("express").Router();
const productController = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Admin routes
router.get("/add", isLoggedIn, isAdmin, productController.getAddProduct);

router.post(
  "/add",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  productController.postAddProduct
);

// Categories page
router.get("/categories", productController.getCategories);

// Products of a category
router.get("/category/:name", productController.getProductsByCategory);

// Product detail
router.get("/:id", productController.getProductDetails);

// Optional all products
router.get("/", productController.getProducts);

module.exports = router;