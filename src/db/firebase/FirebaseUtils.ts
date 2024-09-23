import { collection, CollectionReference } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/main";
import UserDataStoreHandler from "@/store/handlers/UserDataStoreHandler";
import ICollection from "@/models/abstractions/Collection";

export default class FirebaseUtils {
  private userData = new UserDataStoreHandler();

  getCollectionReferenceFromCollection<T>(
    tempCollection: ICollection<T>
  ): CollectionReference<T> {
    return collection(
      doc(db, "users", this.userData.userUid),
      tempCollection.path
    ).withConverter(tempCollection.convertor);
  }
}
