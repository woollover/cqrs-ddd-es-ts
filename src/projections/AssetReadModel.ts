import Asset, { AssetType } from "../aggregates/Asset";
import { BankData, BanksData } from "../constants/Banks";
import { Currency } from "../constants/Rates";
import { randomUUID } from "crypto";

export type AssetView = {
  type: AssetType;
  id: string;
  value: number;
  name: string;
  currency: Currency;
  institution_id: string;
  x_rate: number;
  institution_name: string;
  logo: string;
  countries: string[];
};

export class AssetReadModel implements AssetView {
  private _asset: Asset;
  currency: "EUR" | "USD" | "CHF" | "DKK";
  id: string;
  type: AssetType;
  value: number;
  name: string;
  institution_id: string;
  x_rate: number;
  institution_name: string;
  logo: string;
  countries: string[];

  constructor({
    asset,
    rates,
    banks,
  }: {
    asset: Asset;
    rates: any;
    banks: BanksData;
  }) {
    this._asset = asset;
    this.currency = asset.getCurrency();
    this.id = randomUUID();
    this.type = asset.type;
    this.value = asset.value;
    this.name = asset.name;
    this.x_rate = rates[`${asset.currency.toUpperCase()}`];
    this.institution_id = asset.institution_id;
    this.institution_name = banks[`${asset.institution_id}`].name ?? "ERROR";
    this.logo = banks[`${asset.institution_id}`].logo ?? "ERROR";
    this.countries = banks[`${asset.institution_id}`].countries ?? ["ERROR"];
  }

  craftView(): AssetView {
    const view: AssetView = {
      type: this.type,
      id: this.id,
      value: this.value,
      name: this.name,
      currency: this.currency,
      institution_id: this.institution_id,
      x_rate: this.x_rate,
      institution_name: this.institution_name,
      logo: this.logo,
      countries: this.countries,
    };
    return view;
  }
}
