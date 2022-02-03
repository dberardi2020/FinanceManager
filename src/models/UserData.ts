import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { doc } from "firebase/firestore";
import { db } from "@/main";

const userStore = getModule(UserStore, store);

export default class UserData {
  static get uid(): string {
    return userStore.user?.uid ?? "";
  }

  static get userDataDoc(): any {
    return doc(db, "users", this.uid);
  }
}
