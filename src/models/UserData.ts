import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { doc } from "firebase/firestore";
import { db } from "@/main";

const userStore = getModule(UserStore, store);
const uid = userStore.user?.uid ?? "";
export const userDataDoc = doc(db, "users", uid);
