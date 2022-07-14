/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

import { addDoc, collection, deleteDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/main";
import UserData from "@/models/UserData";

export default class Purchase {
  id?: string;
  sortId?: number;
  date: string;
  description: string;
  category: string;
  amount: number | null;

  constructor(
    date: string,
    description: string,
    category: string,
    amount: number | null
  ) {
    this.date = date;
    this.description = description;
    this.category = category;
    this.amount = amount;
  }

  async addToDB(): Promise<void> {
    try {
      await addDoc(Purchase.purchaseCollection, this);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async deleteFromDB(): Promise<void> {
    try {
      await deleteDoc(
        doc(db, Purchase.purchaseCollection.path, this?.id ?? "")
      );
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async updateInDB(): Promise<void> {
    try {
      await setDoc(
        doc(db, Purchase.purchaseCollection.path, this?.id ?? "").withConverter(
          purchaseConverter
        ),
        this
      );
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  static get purchaseCollection(): any {
    return collection(UserData.userDataDoc, "purchases").withConverter(
      purchaseConverter
    );
  }
}

export const purchaseConverter = {
  toFirestore: (purchase: Purchase) => ({
    date: purchase.date,
    description: purchase.description,
    category: purchase.category,
    amount: purchase.amount,
  }),

  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Purchase(
      data.date,
      data.description,
      data.category,
      data.amount
    );
  },
};
