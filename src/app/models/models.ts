export class Cryptocurrency {
  id: number;
  price: number;
  name: string;
  symbol: string;

  constructor(obj: any) {
    this.id = obj.TOKEN_ID;
    this.price = obj.CURRENT_PRICE;
    this.name = obj.TOKEN_NAME;
    this.symbol = obj.TOKEN_SYMBOL;
  }
}

export class UserMessage {
  user: string;

  constructor(question: string) {
    this.user = question;
  }
}