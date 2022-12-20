import { Router } from "express";
import Products from "../../services/products/products.services.js";

const router = Router();

router.get("/", (_req, res) => {
  res.render("pages/products", {});
});

router.get("/products", async (_req, res) => {
  const productService = new Products();
  const { data } = await productService.getProducts();
  res.render("pages/viewProducts", { products: data });
});

router.post("/new-product", async (req, res) => {
  const data = req.body;
  const productService = new Products();
  await productService.createProduct(data);
  res.redirect("/products");
});

export default router;
