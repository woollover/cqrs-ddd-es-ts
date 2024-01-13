import { randomUUID } from "crypto";

export type AssetType = "cash" | "real_estate" | "crypto";

export default class Asset {
  private type: AssetType;
  private id: string;
  private value: number;
  private name: string;
  private currency: string; // better typing possibile

  constructor({
    type,
    name,
    value,
    currency,
  }: {
    type: AssetType;
    name: string;
    value: number;
    currency: string;
  }) {
    this.type = type;
    this.id = randomUUID();
    this.name = name;
    this.value = value;
    this.currency = currency;
  }

  isNonEuro() {
    return this.currency === "EUR";
  }

  getEuroValue(rate: number) {
    return this.value * rate;
  }

  getName() {
    return this.name;
  }
}
