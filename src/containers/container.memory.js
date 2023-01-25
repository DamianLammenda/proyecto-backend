import { v4 as uuidv4 } from "uuid";

class ContainerMemory {
  constructor() {
    this.array = [];
  }
  async save(obj) {
    try {
      Object.assign(obj, {
        id: uuidv4(),
      });
      this.array.push(obj);
      return obj;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
  async getAll() {
    try {
      return this.array;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
  async getById(id) {
    try {
      const productFiltrad = this.array.filter((i) => i.id == id);
      return productFiltrad;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
  async upDate(upDate, id) {
    try {
      upDate.id = id;
      const productModif = this.array.filter((i) => id != id);
      productModif.push(upDate);
      this.array = productModif;
      return productModif;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
  async delete(id) {
    try {
      this.array.filter((i) => i.code != id);
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
}

export default ContainerMemory;
