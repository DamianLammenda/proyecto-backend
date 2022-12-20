import fs from "fs";
import { getDirName } from "../../../utils.js";

//class de productos
class Products {
  constructor() {
    this.path = getDirName() + "/src/services/products/products.json";
  }

  async createProduct(data) {
    let product = await fs.promises.readFile(this.path, "utf-8");
    const productsObject = JSON.parse(product);
    productsObject.push(data);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsObject),
      null,
      2
    );
    return data;
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProduct(uuid) {
    const product = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(product);
    let productFound = products.find((p) => p.uuid == uuid);
    return productFound;
  }

  async updateProduct(uuid, data) {
    const products = await this.getProducts();
    let productUpdated;
    const productsUpdated = products.map((p) => {
      if (p.uuid === uuid) {
        productUpdated = { ...p, ...data };
        return productUpdated;
      }
      return p;
    });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsUpdated, null, 2)
    );
    return productUpdated;
  }

  async deleteProduct(uuid) {
    const product = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(product);
    const productsFiltered = products.filter((p) => p.uuid !== uuid);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsFiltered, null, "\t")
    );
  }
}
export default Products;
