import SubscriptionSorterEnum from "@/enums/SubscriptionSorterEnum";
import PurchaseSorterEnum from "@/enums/PurchaseSorterEnum";

export default class PurchaseSorterSettings {
  static instance: PurchaseSorterSettings;
  public category: number;

  private constructor() {
    this.category = PurchaseSorterEnum.date;
  }

  public static getInstance(): PurchaseSorterSettings {
    if (!PurchaseSorterSettings.instance) {
      PurchaseSorterSettings.instance = new PurchaseSorterSettings();
    }

    return PurchaseSorterSettings.instance;
  }

  public print(): void {
    console.log(this.sortString());
  }

  public sortString(): string {
    return PurchaseSorterEnum[this.category];
  }
}
