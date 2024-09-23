import Purchase from "@/models/Purchase";
import { PurchaseConverter } from "@/db/firebase/converters/PurchaseConverter";
import Collection from "@/models/abstractions/Collection";
import { getModule } from "vuex-module-decorators";
import PurchasesCollectionStore from "@/store/PurchasesCollectionStore";
import store from "@/store/index";

export default class PurchasesCollection extends Collection<Purchase> {
  constructor() {
    super(
      "purchases",
      new PurchaseConverter(),
      getModule(PurchasesCollectionStore, store)
    );
  }
}
