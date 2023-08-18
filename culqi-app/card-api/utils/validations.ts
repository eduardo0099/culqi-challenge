import { z } from 'zod';
import { Card } from '../models/card';

const cardForm = z.object({
  cardNumber: z
    .string()
    .regex(/^\d+$/)
    .min(13)
    .max(16)
    .refine(
      (value) => {
        if (/[^0-9-\s]+/.test(value)) return false;

        let nCheck = 0;
        value = value.replace(/\D/g, '');

        for (let n = 0; n < value.length; n++) {
          let nDigit = parseInt(value[n], 10);

          if (!((n + value.length) % 2) && (nDigit *= 2) > 9) nDigit -= 9;

          nCheck += nDigit;
        }

        return nCheck % 10 === 0;
      },
      { message: 'Card not valid' },
    ),
  cvv: z.string().regex(/^\d+$/).min(3).max(4),
  expirationYear: z
    .string()
    .regex(/^\d+$/)
    .length(4)
    .refine(
      (value) => {
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= currentYear + 5;
      },
      { message: 'invalid year' },
    ),
  expirationMonth: z
    .string()
    .regex(/^\d+$/)
    .min(1)
    .max(2)
    .refine(
      (value) => {
        const month = parseInt(value, 10);
        return month >= 1 && month <= 12;
      },
      { message: 'invalid month' },
    ),
  email: z.string().email(),
  token: z.string().length(16).optional(),
});

function cardValidation(cardObj: Card) {
  return cardForm.safeParse(cardObj).success;
}

export { cardValidation };
