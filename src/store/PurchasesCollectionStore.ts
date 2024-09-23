import store from "@/store/index";
import { Module } from "vuex-module-decorators";
import Purchase from "@/models/Purchase";
import CollectionStore from "@/store/abstractions/CollectionStore";

@Module({ dynamic: true, store: store, name: "PurchasesCollectionStore" })
export default class PurchasesCollectionStore extends CollectionStore<Purchase> {}
