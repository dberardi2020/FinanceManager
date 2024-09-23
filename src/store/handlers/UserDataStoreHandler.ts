import { getModule } from "vuex-module-decorators";
import { UserDataStore } from "@/store/UserDataStore";
import store from "@/store";

const userStore = getModule(UserDataStore, store);

export default class UserDataStoreHandler {
  get userUid(): string {
    return userStore.user?.uid ?? "";
  }

  get userEmail(): string {
    return userStore.user?.email ?? "";
  }

  get userLoggedIn(): boolean {
    return !!userStore.user;
  }
}
