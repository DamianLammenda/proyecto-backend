const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Cart = require("../../services/cart/cart.services");
const cart = new Cart();

router.get("/", async (_req, res, next) => {
    try {
        const data = await cart.getProducts();
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
        const data = await cart.getProduct(uuid);
        !data
        ? res.status(404).json({ message: "Product not found" })
        : res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    }
);

router.post("/", async (req, res, next) => {
    try {
        const product = { ...req.body };
        Object.assign(product, { uuid: uuidv4() });
        const data = await cart.createProduct(product);
        !data
        ? res.status(404).json({ message: "Product not found" })
        : res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    }
);

router.put("/:uuid", async (req, res, next) => {
    try {
        const { uuid } = req.params;
        const data = await cart.updateProduct(uuid, req.body);
        !uuid
        ? res.status(404).json({ message: "Product not found" })
        : res.status(200).json({
            data,
            //message: `The product with the ID: ${uuid} has been updated successfully`,
        });
    } catch (error) {
        next(error);
    }
    }
);

router.delete("/:uuid", async (req, res, next) => {
    try {
        const { uuid } = req.params;
        const data = await cart.deleteProduct(uuid);
        !uuid
        ? res.status(404).json({ message: "Product not found" })
        : res.status(200).json({
            data,
            //message: `The product with the ID: ${uuid} has been deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
    }
);

module.exports = router;