import Component from "vue-class-component";
import Vue from "vue";
import Purchase from "@/models/Purchase";
import PurchaseSorterEnum from "@/enums/PurchaseSorterEnum";
import PurchaseSorterSettings from "@/models/PurchaseSorterSettings";

@Component
export class PurchaseTableSorter extends Vue {
  private purchaseList: Purchase[] = [];
  private settings = PurchaseSorterSettings.getInstance();

  sort(purchases: Purchase[]): void {
    this.purchaseList = purchases;
    let sortFunction;

    switch (this.settings.category) {
      case PurchaseSorterEnum.date:
        sortFunction = PurchaseTableSorter.sortByDate;
        break;
      case PurchaseSorterEnum.category:
        sortFunction = PurchaseTableSorter.sortByCategory;
        break;
      case PurchaseSorterEnum.amount:
        sortFunction = PurchaseTableSorter.sortByAmount;
        break;
    }

    this.purchaseList.sort(sortFunction);

    this.assignId();
  }

  private static defaultSort(a: Purchase, b: Purchase): number {
    return a.date > b.date ? 1 : -1;
  }

  private static sortByDate(a: Purchase, b: Purchase): number {
    return a.amount && b.amount
      ? a.date < b.date
        ? 1
        : a.date === b.date
        ? a.category > b.category
          ? 1
          : a.category === b.category
          ? a.amount < b.amount
            ? 1
            : -1
          : -1
        : -1
      : this.defaultSort(a, b);
  }

  private static sortByCategory(a: Purchase, b: Purchase): number {
    return a.amount && b.amount
      ? a.category > b.category
        ? 1
        : a.category === b.category
        ? a.amount < b.amount
          ? 1
          : -1
        : -1
      : this.defaultSort(a, b);
  }

  private static sortByAmount(a: Purchase, b: Purchase): number {
    return a.amount && b.amount
      ? a.amount < b.amount
        ? 1
        : -1
      : this.defaultSort(a, b);
  }

  assignId(): void {
    let sortCount = 0;

    this.purchaseList.forEach((purchase) => {
      purchase.sortId = sortCount;
      sortCount++;
    });
  }
}
