import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import Cart from "../../services/cart/cart.services.js";
import Products from "../../services/products/products.services.js";
const cartService = new Cart();
const productService = new Products();

router.get("/", async (_req, res, next) => {
  try {
    const data = await cartService.getCarts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get("/:uuid/products", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await cartService.getProducts(uuid);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (_req, res, next) => {
  try {
    const data = await cartService.createCart();
    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:uuid/products/:uuid_prod", async (req, res, next) => {
  try {
    const { uuid, uuid_prod } = req.params;
    const cartUpdated = await cartService.addProductCart(uuid, uuid_prod);
    res.status(200).json({ sucess: true, data: cartUpdated });
  } catch (error) {
    next(error);
  }
});

router.delete("/:uuid/products/:uuid_prod", async (req, res, next) => {
  try {
    const { uuid, uuid_prod } = req.params;
    await cartService.deleteProductCart(uuid, uuid_prod);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:uuid", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await cartService.deleteCart(uuid);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
