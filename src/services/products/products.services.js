import fs from "fs";

//class de productos
class Products {
  constructor() {}

  async createProduct(data) {
    try {
      let product = await fs.promises.readFile(
        __dirname + "/products.json",
        "utf-8"
      );
      const productsObject = JSON.parse(product);
      productsObject.push(data);
      await fs.promises.writeFile(
        __dirname + "/products.json",
        JSON.stringify(productsObject),
        null,
        2
      );
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
        __dirname + "/products.json",
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
        __dirname + "/products.json",
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
        __dirname + "/products.json",
        "utf-8"
      );
      const products = JSON.parse(product);
      const productsUpdated = products.map((p) =>
        p.uuid == uuid ? { ...p, ...data } : p
      );
      await fs.promises.writeFile(
        __dirname + "/products.json",
        JSON.stringify(productsUpdated, null, 2)
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
        __dirname + "/products.json",
        "utf-8"
      );
      const products = JSON.parse(product);
      const productsFiltered = products.filter((p) => p.uuid !== uuid);
      await fs.promises.writeFile(
        __dirname + "/products.json",
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
export default Products;
