const express = require("express");
const router = express.Router();

let products = [{
    id: 1,
    name: "Escalera",
    price: 100,
    thumbnail: "https://w7.pngwing.com/pngs/687/234/png-transparent-ladder-ladder-angle-technic-wood-thumbnail.png"
}];

router.get("/", (_req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const productFound = products.find((p) => p.id === parseInt(id));
    (!productFound) ? res.status(404).json({ message: "Product not found" }) : res.status(200).json(productFound);
  } catch (error) {
    next(error)
  }
});

router.post("/", (req, res) => {
  try  {
    const product = {...req.body,  id: products.length + 1 };
    products.push(product,`Product Added:`,new Date().toLocaleDateString());
    res.redirect("/public/index.html");
  } catch (error) {
    next(error)
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const productFound = products.find((p) => p.id === parseInt(id));
    if (!productFound) {
      res.status(404).json({ message: "Product not found" });
    }
    const newData = req.body;
    products =  products.map((p) => p.id === parseInt(id) ? {...p, ...newData} : p);
    res.status(200).json({
        products,
        message: `Product updated successfully`,
    });
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = products.find((p) => p.id === parseInt(id));
    (!deleteProduct) ? res.status(404).json({ message: "Product not found" }) : res.status(200).json(`The product ${deleteProduct.name} has been deleted`);
  } catch (error) {
    next(error)
  }
});

module.exports = router;