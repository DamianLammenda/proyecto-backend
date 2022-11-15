const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//class de productos
class Cart {
  constructor() {}

  async createProduct(data) {
    try {
        const product = { ...data };
        Object.assign(product, { uuid: uuidv4() });
        Object.assign(product, { timestamp: Date.now() });
        const products = await fs.promises.readFile(
        __dirname + "/cart.json", "utf-8" );
        const productsParsed = JSON.parse(products);
        productsParsed.push(product);
        await fs.promises.writeFile(
        __dirname + "/cart.json", JSON.stringify(productsParsed, null, "\t") );
    
      return {
        success: true,
        message: `Product created successfully`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      return {
        success: true,
        data: JSON.parse(data),
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getProduct(uuid) {
    try {
      const product = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const products = JSON.parse(product);
      let productFound = products.find((p) => p.uuid == uuid);
      return {
        success: true,
        data: productFound,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateProduct(uuid, data) {
    try {
      const product = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const products = JSON.parse(product);
      const productsUpdated = products.map((p) =>
        p.uuid == uuid ? { ...p, ...data } : p
      );
      await fs.promises.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(productsUpdated, null, "\t")
      );
      return {
        success: true,
        message: `The product with the ID: ${uuid} has been updated successfully`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteProduct(uuid) {
    try {
      const product = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const products = JSON.parse(product);
      const productsFiltered = products.filter((p) => p.uuid !== uuid);
      await fs.promises.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(productsFiltered, null, "\t")
      );
      return {
        success: true,
        message: `The product with the ID: ${uuid} has been deleted successfully`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
module.exports = Cart;