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
    !data
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:uuid/products", async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const data = await cartService.getCart(uuid);
    !data
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/products", async (req, res, next) => {
  try {
    const product = req.body;
    Object.assign(product, { uuid: uuidv4() });
    const data = await cartService.getCart(req.params.id);
    data.products.push(product);
    await cartService.updateCart(req.params.id, data);
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (_req, res, next) => {
  try {
    const data = await cartService.createCart();
    res.status(201).json({
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
    const response = await cartService.getCart(uuid);
    const cart = response.data;
    const product = await productService.getProduct(uuid_prod);
    cart.products.push(product);
    await cartService.updateCart(uuid, cart);
    res.status(200).json({ sucess: true, data: cart });
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

export default router;
