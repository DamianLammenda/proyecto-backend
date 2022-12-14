import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import Products from "../../services/products/products.services.js";
//const Products = require("../../services/products/products.services");
const products = new Products();

router.get("/", async (_req, res, next) => {
  try {
    const data = await products.getProducts();
    !data
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await products.getProduct(uuid);
    !data
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = { ...req.body };
    Object.assign(product, { uuid: uuidv4() });
    const data = await products.createProduct(product);
    !data
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await products.updateProduct(uuid, req.body);
    !uuid
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json({
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
    !uuid
      ? res.status(404).json({ message: "Product not found" })
      : res
          .status(200)
          .json({
              success: true,
              message: `The product with the ID: ${uuid} has been deleted successfully`,
          }
          );
    products.deleteProduct(uuid);
  } catch (error) {
    next(error);
  }
});

export default router;
