import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { CollectionReference } from "@firebase/firestore";
import FirebaseUtils from "@/db/firebase/FirebaseUtils";
import Collection from "@/models/abstractions/Collection";

export default class FirebaseDBWriter<T> {
  private firebaseUtils = new FirebaseUtils();
  private readonly collectionReference: CollectionReference<T>;

  constructor(collection: Collection<T>) {
    this.collectionReference =
      this.firebaseUtils.getCollectionReferenceFromCollection(collection);
  }

  async addToDB(data: T): Promise<string> {
    try {
      return await addDoc(this.collectionReference, data).then((doc) => {
        console.log(
          "Added document to firebase collection: " +
            this.collectionReference.id +
            " with ID: " +
            doc.id
        );

        return doc.id;
      });
    } catch (e) {
      throw new Error("Failed to write to Firebase");
    }
  }

  async deleteFromDB(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.collectionReference, id)).then(() => {
        console.log(
          "deleted document with ID: " +
            id +
            " from firebase collection: " +
            this.collectionReference.id
        );
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async updateInDB(id: string, data: T): Promise<void> {
    try {
      await setDoc(doc(this.collectionReference, id), data).then(() => {
        console.log(
          "updated document with ID: " +
            id +
            " from firebase collection: " +
            this.collectionReference.id
        );
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
}
