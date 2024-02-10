import EventEmitter from "events";
import Asset, { AssetType } from "../../aggregates/Asset";
import ICommand from "../Command";
import DBClient from "../../db/DBClient";
import { Currency, CurrencyRates } from "../../constants/Rates";

export interface CreateAssetArgs {
  name: string;
  type: AssetType;
  currency: Currency;
  value: number; 
  institution_id: string;
}

export default class CreateAsset implements ICommand<CreateAssetArgs> {
  args;
  command_name: string;
  private eventEmitter: EventEmitter;
  private db;

  constructor({
    command_name,
    args,
    eventEmitter,
    writeDBClient,
  }: {
    command_name: string;
    args: CreateAssetArgs; // how can I type this dynamically?
    eventEmitter: EventEmitter;
    writeDBClient: DBClient;
  }) {
    this.command_name = command_name;
    this.args = args;
    this.eventEmitter = eventEmitter;
    this.db = writeDBClient;
  }

  execute() {
    // create the aggregate
    const asset = new Asset({
      type: this.args.type,
      name: this.args.name,
      value: this.args.value,
      currency: this.args.currency,
      institution_id: this.args.institution_id,
    });
    console.log("🟨 - ASSET: ", asset);
    // check against policies
    if (Object.keys(CurrencyRates).includes(this.args.currency) == false) {
      throw new Error(
        "Validation error: you are using a currency that is not supported"
      );
    }

    // save to writeDB
    this.db.put(asset);

    // emit the event in the eventEmitter
    this.eventEmitter.emit("AssetAdded", { asset, ts: Date.now() });

    return {
      status: true,
    };
  }
}
