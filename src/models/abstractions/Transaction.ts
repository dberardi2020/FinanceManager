export default abstract class Transaction {
  public category: string;
  public amount: number;

  protected constructor(category: string, amount: number) {
    this.category = category;
    this.amount = amount;
  }
}
