import ContainerMongo from "../../containers/container.mongo.js";
import productModel from "../../models/mongo.model.js";

class ProductsMongo extends ContainerMongo {
  constructor() {
    super(productModel);
  }
}

export default ProductsMongo;


