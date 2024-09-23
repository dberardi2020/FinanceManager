import Transaction from "@/models/abstractions/Transaction";

export default class Subscription extends Transaction {
  isActive: boolean;
  isWithdrawal: boolean;
  source: string;
  destination: string;

  constructor(
    category: string,
    amount: number,
    isActive: boolean,
    isWithdrawal: boolean,
    source: string,
    destination: string
  ) {
    super(category, amount);
    this.isActive = isActive;
    this.isWithdrawal = isWithdrawal;
    this.source = source;
    this.destination = destination;
  }
}
