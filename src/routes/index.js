import express from "express";
const router = express.Router();
import products from "../routes/products/products.routes.js";
// const products = require("./products/products.routes");
import cart from "./cart/cart.routes.js";
//const cart = require("./cart/cart.routes");

//status
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    environment: process.env.ENV || "development",
  });
});

router.use("/products", products);
router.use("/cart", cart);



export default router;
