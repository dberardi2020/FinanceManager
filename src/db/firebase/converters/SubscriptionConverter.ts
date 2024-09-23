import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  SnapshotOptions,
  WithFieldValue,
} from "@firebase/firestore";
import Subscription from "@/models/Subscription";

export class SubscriptionConverter
  implements FirestoreDataConverter<Subscription>
{
  fromFirestore(snapshot: any, options?: SnapshotOptions): Subscription {
    const data = snapshot.data(options);
    return new Subscription(
      data.category,
      data.amount,
      data.isActive,
      data.isWithdrawal,
      data.source,
      data.destination
    );
  }

  toFirestore(
    modelObject:
      | WithFieldValue<Subscription>
      | PartialWithFieldValue<Subscription>
  ): DocumentData {
    return {
      category: modelObject.category,
      amount: modelObject.amount,
      isActive: modelObject.isActive,
      isWithdrawal: modelObject.isWithdrawal,
      source: modelObject.source,
      destination: modelObject.destination,
    };
  }
}
