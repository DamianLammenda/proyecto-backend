import mongoose from "mongoose";
import _ from "lodash";

class ContainerMongo {
  contructor(model) {
    this.model = model;
  }
  async save(data) {
    try {
      const objet = await new this.model(data);
      return objet.save();
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
      const data = await this.model.find({});
      return data;
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
      const data = await this.model.findById(id);
      if (isNil(data) || isNull(data)) throw new Error("item not found");
      return data;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }

  async updateById(id, data) {
    try {
      const dataUpdated = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return dataUpdated;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
  async deleteById(id) {
    try {
      const data = await this.model.findByIdAndDelete(id);
      return data;
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
}

export default ContainerMongo;
