import Transaction from "@/models/abstractions/Transaction";

export default class Subscription extends Transaction {
  isActive: boolean;
  isWithdrawal: boolean;
  source: string;
  destination: string;
  url: string;

  constructor(
    category: string,
    amount: number,
    isActive: boolean,
    isWithdrawal: boolean,
    source: string,
    destination: string,
    url: string
  ) {
    super(category, amount);
    this.isActive = isActive;
    this.isWithdrawal = isWithdrawal;
    this.source = source;
    this.destination = destination;
    this.url = url;
  }
}

export const subConverter = {
  toFirestore: (sub: Subscription) => ({
    isActive: sub.isActive,
    isWithdrawal: sub.isWithdrawal,
    category: sub.category,
    amount: sub.amount,
    source: sub.source,
    destination: sub.destination,
    url: sub.url,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Subscription(
      data.isActive,
      data.isWithdrawal,
      data.category,
      data.amount,
      data.source,
      data.destination,
      data.url
    );
  },
};
