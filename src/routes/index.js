const express = require("express");
const router = express.Router();
const products = require("./products/products.routes");

//status
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    environment: process.env.ENV || "development",
  });
});

router.use("/", products);

module.exports = router;
