import { randomUUID } from "crypto";
import { Currency } from "../constants/Rates";

export type AssetType = "cash" | "real_estate" | "crypto";

export default class Asset {
  readonly type: AssetType;
  readonly id: string;
  value: number;
  name: string;
  currency: Currency;
  institution_id: string;

  constructor({
    type,
    name,
    value,
    currency,
    institution_id,
  }: {
    type: AssetType;
    name: string;
    value: number;
    currency: Currency;
    institution_id: string;
  }) {
    this.type = type;
    this.id = randomUUID();
    this.name = name;
    this.value = value;
    this.currency = currency;
    this.institution_id = institution_id;
  }

  isNonEuro() {
    return this.currency === "EUR";
  }

  getCurrency() {
    return this.currency;
  }

  getEuroValue(rate: number) {
    return this.value * rate;
  }

  getName() {
    return this.name;
  }

  getInstitutionID() {
    return this.institution_id;
  }
}
