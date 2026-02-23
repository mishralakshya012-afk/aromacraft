// Load Environment Variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();

// ==============================
// MongoDB Connection
// ==============================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log(err));

// ==============================
// Middlewares
// ==============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Make user available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// ==============================
// View Engine
// ==============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==============================
// Routes
// ==============================
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/cartRoutes"));
app.use("/", require("./routes/orderRoutes"));

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// ==============================
// Server Start
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});