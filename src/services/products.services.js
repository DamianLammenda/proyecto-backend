const knexConfig = require("../database/config");
const knex = require("knex");
const { v4: uuidv4 } = require("uuid");

//class de productos
class Products {
  constructor() {
    this.knex = knex(knexConfig);
  }
  async saveProduct(product) {
    Object.assign(product, { id: uuidv4() });
    return new Promise((resolve, reject) => {
      this.knex("products")
        .insert(product)
        .then(() => {
          resolve({
            success: true,
            data: product,
          });
        })
        .catch((err) => reject(err));
    });
  }
  async getProduct(id) {
    try {
      const product = await this.knex("products")
        .where("id", "=", id)
        .select("*");
      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      const productFormated = JSON.parse(JSON.stringify(product));
      return {
        success: true,
        data: productFormated,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    try {
      const products = await this.knex("products").select("*");
      if (!products) {
        return {
          success: false,
          error: "Products not found",
        };
      }
      const productsFormated = JSON.parse(JSON.stringify(products));
      return {
        success: true,
        data: productsFormated,
      };
    } catch (error) {
     console.error(error);
    }
  }
 
  async deleteProduct(id) {
    try {
      const product = await this.knex("products")
        .where("id", "=", id)
        .del();
      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error(error);
    }
  }
  async updateProduct(id, product) {
    try {
      const productUpdated = await this.knex("products")
        .where("id", "=", id)
        .update(product);
      if (!productUpdated) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      return {
        success: true,
        data: productUpdated,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Products;
