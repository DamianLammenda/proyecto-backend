import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import Products from "../../services/products/products.services.js";
//const Products = require("../../services/products/products.services");
const products = new Products();

router.get("/", async (_req, res, next) => {
  try {
    const data = await products.getProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await products.getProduct(uuid);
    !data
      ? res.status(404).json({ success: false, message: "Product not found" })
      : res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = { ...req.body };
    Object.assign(product, { uuid: uuidv4() });
    const data = await products.createProduct(product);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.put("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await products.updateProduct(uuid, req.body);
    !data
      ? res.status(404).json({ success: false, message: "Product not found" })
      : res.status(200).json({
          success: true,
          data,
          message: `The product with the ID: ${uuid} has been updated successfully`,
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await products.deleteProduct(uuid);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
