import fs from "fs";
import { v4 as uuidv4 } from "uuid";

//class de productos
class Cart {
  constructor() {}

  async createCart() {
    try {
      const cart = { products: [] };
      Object.assign(cart, { uuid: uuidv4() });
      Object.assign(cart, { timestamp: Date.now() });
      const carts = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const cartsParsed = JSON.parse(carts);
      cartsParsed.push(cart);
      await fs.promises.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(cartsParsed, null, 2)
      );
      return {
        success: true,
        data: cart.uuid,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getCarts() {
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

  async getCart(uuid) {
    try {
      const cart = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const carts = JSON.parse(cart);
      let cartFound = carts.find((p) => p.uuid == uuid);
      return {
        success: true,
        data: cartFound,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateCart(uuid, data) {
    try {
      const cart = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const carts = JSON.parse(cart);
      const cartsUpdated = carts.map((p) =>
        p.uuid == uuid ? { ...p, ...data } : p
      );
      await fs.promises.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(cartsUpdated, null, 2)
      );
      return cartsUpdated;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(uuid) {
    try {
      const cart = await fs.promises.readFile(
        __dirname + "/cart.json",
        "utf-8"
      );
      const carts = JSON.parse(cart);
      const cartsFiltered = carts.filter((p) => p.uuid !== uuid);
      await fs.promises.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(cartsFiltered, null, 2)
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
  async deleteProductCart (cartId, productId) {
    try {
      const cart = await this.getCart(cartId);
      cart.products = cart.products.filter((p) => p.uuid !== productId);
      await this.updateCart(cartId, cart);
    }catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
export default Cart;
