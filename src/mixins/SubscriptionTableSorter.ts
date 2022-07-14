import Component from "vue-class-component";
import Vue from "vue";
import Subscription from "@/models/Subscription";
import SubscriptionSorterEnum from "@/enums/SubscriptionSorterEnum";
import SubscriptionSorterSettings from "@/models/SubscriptionSorterSettings";

@Component
export class SubscriptionTableSorter extends Vue {
  private subscriptionList: Subscription[] = [];
  private settings = SubscriptionSorterSettings.getInstance();

  sort(subs: Subscription[]): void {
    this.subscriptionList = subs;
    let sortFunction;

    switch (this.settings.category) {
      case SubscriptionSorterEnum.category:
        sortFunction = SubscriptionTableSorter.sortByCategory;
        break;
      case SubscriptionSorterEnum.isActive:
        sortFunction = SubscriptionTableSorter.sortByActive;
        break;
      case SubscriptionSorterEnum.source:
        sortFunction = SubscriptionTableSorter.sortBySource;
        break;
      case SubscriptionSorterEnum.amount:
        sortFunction = SubscriptionTableSorter.sortByAmount;
        break;
    }

    this.subscriptionList.sort(sortFunction);

    if (this.settings.pinDepositToTop) {
      this.sortDepositsFirst();
    }

    this.assignId();
  }

  private static defaultSort(a: Subscription, b: Subscription): number {
    return a.category > b.category ? 1 : -1;
  }

  private static sortByCategory(a: Subscription, b: Subscription): number {
    return a.amount && b.amount
      ? a.category > b.category
        ? 1
        : a.category === b.category
        ? a.isActive < b.isActive
          ? 1
          : a.isActive === b.isActive
          ? a.amount < b.amount
            ? 1
            : -1
          : -1
        : -1
      : this.defaultSort(a, b);
  }

  private static sortByActive(a: Subscription, b: Subscription): number {
    return a.amount && b.amount
      ? a.isActive < b.isActive
        ? 1
        : a.isActive === b.isActive
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

  private static sortBySource(a: Subscription, b: Subscription): number {
    return a.amount && b.amount
      ? a.source > b.source
        ? 1
        : a.source === b.source
        ? a.amount < b.amount
          ? 1
          : -1
        : -1
      : this.defaultSort(a, b);
  }

  private static sortByAmount(a: Subscription, b: Subscription): number {
    return a.amount && b.amount
      ? a.amount < b.amount
        ? 1
        : -1
      : this.defaultSort(a, b);
  }

  private sortDepositsFirst(): void {
    const depositsArray = this.subscriptionList.filter((x) => !x.isWithdrawal);
    const withdrawalArray = this.subscriptionList.filter((x) => x.isWithdrawal);

    this.subscriptionList = depositsArray.concat(withdrawalArray);
  }

  assignId(): void {
    let sortCount = 0;

    this.subscriptionList.forEach((sub) => {
      sub.sortId = sortCount;
      sortCount++;
    });
  }
}
