import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/main";
import { doc, setDoc } from "firebase/firestore";
import { getModule } from "vuex-module-decorators";
import { UserDataStore } from "@/store/UserDataStore";
import store from "@/store";

const userStore = getModule(UserDataStore, store);

export default class UserAuthHandler {
  static initializeUserStoreAuthListener(): Promise<boolean> {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (user) => {
        userStore.setUser(user);
        resolve(true);
      });
    });
  }

  logInExistingUser(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error.message);
          resolve(false);
        });
    });
  }

  createNewUserAccount(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setDoc(doc(db, "users", userCredential.user.uid), {}).then();
          resolve(true);
        })
        .catch((error) => {
          console.log(error.message);
          resolve(false);
        });
    });
  }

  logOutCurrentUser(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      signOut(auth)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error.message);
          resolve(false);
        });
    });
  }
}
