/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/main";

export default class Subscription {
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

const userStore = getModule(UserStore, store);
const uid = userStore.user?.uid ?? "";
export const subCollection = collection(
  db,
  "users",
  uid,
  "subscriptions"
).withConverter(subConverter);
