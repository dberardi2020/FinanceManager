import SubscriptionSorterEnum from "@/enums/SubscriptionSorterEnum";

export default class SubscriptionSorterSettings {
  static instance: SubscriptionSorterSettings;
  public pinDepositToTop: boolean;
  public category: number;

  private constructor() {
    this.pinDepositToTop = true;
    this.category = SubscriptionSorterEnum.category;
  }

  public static getInstance(): SubscriptionSorterSettings {
    if (!SubscriptionSorterSettings.instance) {
      SubscriptionSorterSettings.instance = new SubscriptionSorterSettings();
    }
    return SubscriptionSorterSettings.instance;
  }

  public print(): void {
    console.log(this.sortString());
  }

  public sortString(): string {
    return SubscriptionSorterEnum[this.category];
  }
}
