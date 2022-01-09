import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { collection } from "firebase/firestore";
import { db } from "@/main";

export default class Subscription {
  isActive: boolean;
  isWithdrawal: boolean;
  category: string;
  amount: number;
  source: string;
  destination: string;

  constructor(
    isActive: boolean,
    isWithdrawal: boolean,
    category: string,
    amount: number,
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
}

export const subConverter = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  toFirestore: (sub: Subscription) => ({
    isActive: sub.isActive,
    isWithdrawal: sub.isWithdrawal,
    category: sub.category,
    amount: sub.amount,
    source: sub.source,
    destination: sub.destination,
  }),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
