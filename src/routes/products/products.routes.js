const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Products = require("../../services/products.services");
const products = new Products();


router.post("/", async (req, res, next) => {
  const {body} = req;
  if (_.isNil(body)) {
    return res.status(400).json({
      success: false,
      error: "Request body is missing",
    });
  }
  try {
    const product = await products.saveProduct(body);
    if (!product) {
      return res.status(400).json({ success: false, error: err });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
   if (_.isNil(id)) {
     return res.status(400).json({
       success: false,
       error: "Request body is missing",
     });
  }
  try{
    const product = await products.getProduct(id);
    if (!product) {
      return res.status(400).json({ success: false, error: err });
    }
    res.status(200).json({ product });
  }
    catch (error) {
    next(error);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    await products.getProducts();
    if (!products) {
      return res.status(400).json({ success: false, error: err });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (_.isNil(id)) {
    return res.status(400).json({
      success: false,
      error: "Request body is missing",
    });
  }
  try{
    const product = await products.deleteProduct(id);
    if (!product.success) {
      return res.status(400).json({ success: false, product: "product not found" });
    }
    res.status(200).json({ success: true, message: "product deleted" });
  }
    catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  if (_.isNil(id)) {
    return res.status(400).json({
      success: false,
      error: "Request body is missing",
    });
  }
  try{
    const product = await products.updateProduct(id, body);
    if (!product) {
      return res.status(400).json({ success: false, product: "product not found" });
    }
    res.status(200).json({ product });
  }
    catch (error) {
    next(error);
  }
});


module.exports = router;
