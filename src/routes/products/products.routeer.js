const express = require("express");
const router = express.Router();
const Products = require("../../services/products.services");
const products = new Products();

router.get("/", (_req, res, next) => {
  try {
    res.render("products", { products: products.getproduct() });
  } catch (error) {
    next(error);
  }
});

router.get("/products", (_req, res, next) => {
  try {
    res.render("viewProducts", { products: products.getproduct() });
  } catch (error) {
    next(error);
  }
});

router.post("/products", (req, res, next) => {
  try {
    const { name, price, thumbnail } = req.body;
    products.saveProduct({ name, price, thumbnail });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
