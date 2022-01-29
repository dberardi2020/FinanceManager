/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/main";
import { purchaseCollection, purchaseConverter } from "@/models/Purchase";
import { userDataDoc } from "@/models/UserData";

export default class Subscription {
  id?: string;
  isActive: boolean;
  isWithdrawal: boolean;
  category: string;
  amount: number | null;
  source: string;
  destination: string;

  constructor(
    isActive: boolean,
    isWithdrawal: boolean,
    category: string,
    amount: number | null,
    source: string,
    destination: string
  ) {
    this.isActive = isActive;
    this.isWithdrawal = isWithdrawal;
    this.category = category;
    this.amount = amount;
    this.source = source;
    this.destination = destination;
  }

  async addToDB(): Promise<void> {
    try {
      await addDoc(subCollection, this);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async deleteFromDB(): Promise<void> {
    try {
      await deleteDoc(doc(db, subCollection.path, this?.id ?? ""));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async updateInDB(): Promise<void> {
    try {
      await setDoc(
        doc(db, subCollection.path, this?.id ?? "").withConverter(subConverter),
        this
      );
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
}

export const subConverter = {
  toFirestore: (sub: Subscription) => ({
    isActive: sub.isActive,
    isWithdrawal: sub.isWithdrawal,
    category: sub.category,
    amount: sub.amount,
    source: sub.source,
    destination: sub.destination,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Subscription(
      data.isActive,
      data.isWithdrawal,
      data.category,
      data.amount,
      data.source,
      data.destination
    );
  },
};

export const subCollection = collection(
  userDataDoc,
  "subscriptions"
).withConverter(subConverter);
