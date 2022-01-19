import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "@/main";

export default class Purchase {
  date: string;
  description: string;
  category: string;
  amount: number;

  constructor(
    date: string,
    description: string,
    category: string,
    amount: number
  ) {
    this.date = date;
    this.description = description;
    this.category = category;
    this.amount = amount;
  }

  async addData(): Promise<void> {
    console.log(this);
    try {
      console.log(this);
      await addDoc(purchaseCollection, this);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async clearData(): Promise<void> {
    try {
      const querySnapshot = await getDocs(purchaseCollection);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
}

export const purchaseConverter = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  toFirestore: (purchase: Purchase) => ({
    date: purchase.date,
    description: purchase.description,
    category: purchase.category,
    amount: purchase.amount,
  }),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

const userStore = getModule(UserStore, store);
const uid = userStore.user?.uid ?? "";
export const purchaseCollection = collection(
  db,
  "users",
  uid,
  "purchases"
).withConverter(purchaseConverter);
