import Component from "vue-class-component";
import Vue from "vue";
import Subscription from "@/models/Subscription";
import SubscriptionSortSettings from "@/models/SubscriptionSortSettings";
import SubscriptionSortEnum from "@/enums/SubscriptionSortEnum";

@Component
export class SubscriptionTableSorter extends Vue {
  private subscriptionList: Subscription[] = [];
  private settings = SubscriptionSortSettings.getInstance();

  sort(subs: Subscription[]): void {
    this.subscriptionList = subs;
    let sortFunction;

    switch (this.settings.category) {
      case SubscriptionSortEnum.category:
        sortFunction = SubscriptionTableSorter.sortByCategory;
        break;
      case SubscriptionSortEnum.isActive:
        sortFunction = SubscriptionTableSorter.sortByActive;
        break;
      case SubscriptionSortEnum.amount:
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
          ? a.amount > b.amount
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
          ? a.amount > b.amount
            ? 1
            : -1
          : -1
        : -1
      : this.defaultSort(a, b);
  }

  private static sortByAmount(a: Subscription, b: Subscription): number {
    return a.amount && b.amount
      ? a.amount > b.amount
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
