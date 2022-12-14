import {
  addDoc,
  getDoc,
  getDocs,
  query,
  collection,
  setDoc,
} from "firebase/firestore";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase.config";

class ContainerFirebase {
  constructor(model) {
    this.model = model;
  }

  async save(data) {
    try {
      const id = uuidv4();
      const docRef = await addDoc(collection(db, this.model), { id, ...data });
      const docSnap = await getDoc(docRef);
      return docSnap.data();
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
      const q = query(collection(db, this.model));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
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
      const docRef = await getDoc(doc(db, this.model, id));
      const data = docRef.data();
      if (_.isNil(data) || _.isNull(data)) throw new Error("item not found");
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
      const docRef = await setDoc(doc(db, this.model, id), data, {
        merge: true,
      });
      const docSnap = await getDoc(docRef);
      return docSnap.data();
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
      const docRef = await deleteDoc(doc(db, this.model, id));
      return docRef.data();
    } catch (err) {
      console.error(err);
      return {
        success: true,
        message: err.message,
      };
    }
  }
}

export default ContainerFirebase;
