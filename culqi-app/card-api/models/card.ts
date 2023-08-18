import { cardValidation } from '../utils/validations';

export interface CardBody {
  card_number: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
  cvv?: string;
}

export class Card {
  cardNumber: string;
  cvv?: string;
  expirationYear: string;
  expirationMonth: string;
  email: string;
  token?: string;

  constructor(data: CardBody) {
    this.cardNumber = data.card_number;
    this.expirationYear = data.expiration_year;
    this.expirationMonth = data.expiration_month;
    this.email = data.email;
    this.cvv = data.cvv;
  }

  validateFormat(): boolean {
    return cardValidation(this);
  }

  cardToString(): string {
    return JSON.stringify({
      card_number: this.cardNumber,
      expiration_year: this.expirationYear,
      expiration_month: this.expirationMonth,
      cvv: this.cvv,
      email: this.email,
    });
  }

  publicCard(): CardBody {
    return {
      card_number: this.cardNumber,
      expiration_month: this.expirationMonth,
      expiration_year: this.expirationYear,
      email: this.email,
    };
  }
}
