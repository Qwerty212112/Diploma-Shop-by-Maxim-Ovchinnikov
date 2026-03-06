const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./product");
const userRoutes = require("./user");

const router = express.Router();

router.use(authRoutes);
router.use(productRoutes);
router.use(userRoutes);

module.exports = router;
