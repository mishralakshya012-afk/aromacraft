// ==============================
// Load Environment Variables
// ==============================
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// 🔐 Security Packages
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// ==============================
// MongoDB Connection
// ==============================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("MongoDB Error:", err));

// ==============================
// Security Middlewares
// ==============================
app.use(helmet());
app.use(hpp());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ==============================
// Body Parsing
// ==============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==============================
// Session Configuration
// ==============================
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ==============================
// Static Folder
// ==============================
app.use(express.static(path.join(__dirname, "public")));

// Make user available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
     res.locals.url = req.originalUrl; 
    next();
});

// ==============================
// View Engine
// ==============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

// Default layout for frontend
app.set("layout", "layouts/main");

// ==============================
// Routes
// ==============================
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// ==============================
// Home Route
// ==============================
const Product = require("./models/Product");

app.get("/", async (req, res) => {

  const products = await Product.find();

  res.render("shop/index", {
    products
  });

});


// ==============================
// Auth Pages
// ==============================

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});


// ==============================
// 404 Page
// ==============================
app.use((req, res) => {
    res.status(404).render("error", {
        error: "Page not found"
    });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        error: "Something went wrong!"
    });
});

// ==============================
// Server Start
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});