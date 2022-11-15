const express = require("express");
const router = express.Router();
const products = require("./products/products.routes");
const cart = require("./cart/cart.routes");

//status
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    environment: process.env.ENV || "development",
  });
});

router.use("/products", products);
router.use("/cart", cart);



module.exports = router;
