export const CurrencyRates = {
  EUR: 1,
  USD: 0.9874,
  CHF: 1.12,
  DKK: 16.234,
};

export type Currency = keyof typeof CurrencyRates;
//            ^?
