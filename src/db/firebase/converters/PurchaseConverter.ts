import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  SnapshotOptions,
  WithFieldValue,
} from "@firebase/firestore";
import Purchase from "@/models/Purchase";

export class PurchaseConverter implements FirestoreDataConverter<Purchase> {
  fromFirestore(snapshot: any, options?: SnapshotOptions): Purchase {
    const data = snapshot.data(options);
    return new Purchase(
      data.date,
      data.description,
      data.category,
      data.amount
    );
  }

  toFirestore(
    modelObject: WithFieldValue<Purchase> | PartialWithFieldValue<Purchase>
  ): DocumentData {
    return {
      date: modelObject.date,
      description: modelObject.description,
      category: modelObject.category,
      amount: modelObject.amount,
    };
  }
}
