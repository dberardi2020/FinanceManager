import { Mutation, VuexModule } from "vuex-module-decorators";

export default abstract class CollectionStore<T> extends VuexModule {
  private _items: T[] = [];

  @Mutation
  pushItem(item: T): void {
    this._items.push(item);
  }

  @Mutation
  clearCollection(): void {
    this._items = [];
  }

  get items(): T[] {
    return this._items;
  }
}
