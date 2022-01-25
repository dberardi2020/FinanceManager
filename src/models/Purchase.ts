/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

import { addDoc, collection } from "firebase/firestore";
import { userDataDoc } from "@/models/UserData";

export default class Purchase {
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
      await addDoc(purchaseCollection, this);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

export const purchaseCollection = collection(
  userDataDoc,
  "purchases"
).withConverter(purchaseConverter);
