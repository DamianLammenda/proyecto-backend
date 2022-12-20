import ContainerMongo from "../../containers/container.mongo.js";
import cartModel from "../../models/cart.model.js";
import mongoose from "mongoose";

class CartsMongo extends ContainerMongo {
  constructor() {
    super(cartModel);
  }
  async addProduct(cartId, prodId) {
    throw new Error("Metodo no implementado");
  }
  async deleteProduct(cartId, prodId) {
    throw new Error("Metodo no implementado");
  }
  async getProducts(cartId) {
    throw new Error("Metodo no implementado");
  }
}

export default CartsMongo;
