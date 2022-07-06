import SubscriptionSortEnum from "@/enums/SubscriptionSortEnum";

export default class SubscriptionSortSettings {
  static instance: SubscriptionSortSettings;
  public pinDepositToTop: boolean;
  public category: number;

  private constructor() {
    this.pinDepositToTop = true;
    this.category = SubscriptionSortEnum.category;
  }

  public static getInstance(): SubscriptionSortSettings {
    if (!SubscriptionSortSettings.instance) {
      SubscriptionSortSettings.instance = new SubscriptionSortSettings();
    }
    return SubscriptionSortSettings.instance;
  }

  public print(): void {
    console.log(this.sortString());
  }

  public sortString(): string {
    return SubscriptionSortEnum[this.category];
  }
}
