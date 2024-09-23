import Transaction from "@/models/abstractions/Transaction";

export default class Purchase extends Transaction {
  public date: string;
  public description: string;

  constructor(
    category: string,
    amount: number,
    date: string,
    description: string
  ) {
    super(category, amount);
    this.date = date;
    this.description = description;
  }
}
