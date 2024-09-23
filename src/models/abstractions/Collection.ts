import { FirestoreDataConverter, onSnapshot, query } from "@firebase/firestore";
import FirebaseDBWriter from "@/db/firebase/FirebaseDBWriter";
import CollectionStore from "@/store/abstractions/CollectionStore";
import FirebaseUtils from "@/db/firebase/FirebaseUtils";

export default abstract class Collection<T> {
  readonly path: string;
  readonly convertor: FirestoreDataConverter<T>;
  readonly store: CollectionStore<T>;
  readonly dbWriter: FirebaseDBWriter<T>;

  private firebaseUtils = new FirebaseUtils();

  protected constructor(
    path: string,
    convertor: FirestoreDataConverter<T>,
    store: CollectionStore<T>
  ) {
    this.path = path;
    this.convertor = convertor;
    this.store = store;

    this.dbWriter = new FirebaseDBWriter<T>(this);
    this.handleSnapshot();
  }

  async addItem(data: T): Promise<string> {
    return await this.dbWriter.addToDB(data);
  }

  updateItem(id: string, data: T) {
    this.dbWriter.updateInDB(id, data).then();
  }

  deleteItem(id: string) {
    this.dbWriter.deleteFromDB(id).then();
  }

  get items(): T[] {
    return this.store.items;
  }

  private handleSnapshot(): void {
    onSnapshot(
      query(this.firebaseUtils.getCollectionReferenceFromCollection(this)),
      (querySnapshot) => {
        this.store.clearCollection();
        querySnapshot.forEach((doc) => {
          this.store.pushItem(doc.data());
        });
      }
    );
  }
}
