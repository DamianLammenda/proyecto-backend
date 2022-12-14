import fs from "fs";

class ContainerFs {
  constructor(data) {
    this.data = data;
  }
  async save(data) {
    try {
      const products = await fs.promises.readFile(
        getDirName() + "/products.json"
      );
      const productsObject = JSON.parse(products);
      data.timestamp = Date.now() / 1000;
      productsObject.push(data);
      await fs.promises.writeFile(
        getDirName() + "/products.json",
        JSON.stringify(productsObject, null, 2)
      );
      return {
        success: true,
        data,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(getDirName() + "/products.json");
      return {
        success: true,
        data: JSON.parse(data),
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
  }
  async getById(uuid) {
    try {
      const products = await fs.promises.readFile(
        getDirName() + "/products.json"
      );
      const productsObject = JSON.parse(products);
      const product = productsObject.filter((i) => i.id == uuid);
      return {
        success: true,
        data: product[0],
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async upDate(uuid, data) {
    try {
      const products = await this.getAll();
      const newList = await products.data.map((i) => {
        if (i.id == uuid) {
          return {
            nombre: data.nombre,
            precio: data.precio,
            imgURL: data.imgURL,
            descripcion: data.descripcion,
            codigo: data.codigo,
            stock: data.stock,
            id: data.id,
            timestamp: data.timestamp,
          };
        }
        return i;
      });
      await fs.promises.writeFile(
        getDirName() + "/products.json",
        JSON.stringify(newList, null, 2)
      );
      return {
        success: true,
        data: `Product ${uuid} modificado exitosamente`,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async delete(uuid) {
    try {
      const products = await fs.promises.readFile(
        getDirName() + "/products.json"
      );
      const productsObject = JSON.parse(products);
      const newProducts = productsObject.filter((i) => i.uuid != uuid);
      await fs.promises.writeFile(
        getDirName() + "/products.json",
        JSON.stringify(newProducts, null, 2)
      );
      return {
        success: true,
        data: `Product ${uuid} borrado  exitosamente`,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default ContainerFs;
