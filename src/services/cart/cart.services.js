import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { getDirName } from "../../../utils.js";
import Products from "../products/products.services.js";

// const dao = await (await import('blabla')).default

//class de productos
class Cart {
  constructor() {
    this.path = getDirName() + "/src/services/cart/cart.json";
  }

  async createCart() {
    const cart = { products: [] };
    Object.assign(cart, { uuid: uuidv4() });
    Object.assign(cart, { timestamp: Date.now() });
    const carts = await fs.promises.readFile(this.path, "utf-8");
    const cartsParsed = JSON.parse(carts);
    cartsParsed.push(cart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(cartsParsed, null, 2)
    );
    return cart.uuid;
  }

  async getCarts() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getCart(uuid) {
    const carts = this.getCarts();
    let cartFound = carts.find((p) => p.uuid == uuid);
    return cartFound;
  }

  async updateCart(uuid, data) {
    const carts = await this.getCarts();
    let cartUpdated;
    const cartsUpdated = carts.map((cart) => {
      if (cart.uuid === uuid) {
        cartUpdated = { ...cart, ...data };
        return cartUpdated;
      }
      return cart;
    });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(cartsUpdated, null, 2)
    );
    return cartUpdated;
  }

  async deleteCart(uuid) {
    const carts = await this.getCarts();
    const cartsFiltered = carts.filter((p) => p.uuid !== uuid);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(cartsFiltered, null, 2)
    );
  }
  async deleteProductCart(cartId, productId) {
    const cart = await this.getCart(cartId);
    cart.products = cart.products.filter((p) => p.uuid !== productId);
    await this.updateCart(cartId, cart);
  }
  async addProductCart(cartId, productId) {
    const productService = new Products();
    const product = productService.getProduct(productId)
    const cart = await this.getCart(cartId);
    cart.products.push(product)
    return await this.updateCart(cartId, cart);
  }
  async getProducts(cartId) {
    const cart = await this.getCart(cartId)
    return await cart.products
  }
}
export default Cart;
