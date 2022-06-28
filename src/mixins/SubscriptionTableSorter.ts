import Component from "vue-class-component";
import Vue from "vue";
import Subscription from "@/models/Subscription";

@Component
export class SubscriptionTableSorter extends Vue {
  sort(subs: Subscription[]): void {
    let sortCount = 0;
    const depositsArray = subs.filter((x) => !x.isWithdrawal);
    const withdrawalArray = subs.filter((x) => x.isWithdrawal);
    const result: Subscription[] = [];

    depositsArray.forEach((sub) => {
      sub.sortId = sortCount;
      result.push(sub);
      sortCount++;
    });

    withdrawalArray.forEach((sub) => {
      sub.sortId = sortCount;
      result.push(sub);
      sortCount++;
    });
  }
}
