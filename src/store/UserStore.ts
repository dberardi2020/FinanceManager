import store from "@/store/index";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

@Module({ dynamic: true, store: store, name: "UserStore" })
export class UserStore extends VuexModule {
  user: UserInfo | null = null;

  @Mutation
  setUser(user: UserInfo | null): void {
    this.user = user;
  }
}
