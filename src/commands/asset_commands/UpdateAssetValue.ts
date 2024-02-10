import EventEmitter from "events";
import Asset from "../../aggregates/Asset";
import ICommand from "../Command";
import DBClient from "../../db/DBClient";
import { Currency, CurrencyRates } from "../../constants/Rates";

export interface UpdateAssetValueCommandArgs {
  id: string;
  value: number;
  currency?: Currency;
}

export default class UpdateAssetValue
  implements ICommand<UpdateAssetValueCommandArgs>
{
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
    args: UpdateAssetValueCommandArgs; // how can I type this dynamically?
    eventEmitter: EventEmitter;
    writeDBClient: DBClient;
  }) {
    this.command_name = command_name;
    this.args = args;
    this.eventEmitter = eventEmitter;
    this.db = writeDBClient;
  }

  execute() {
    const assetData = this.db.get(this.args.id)[0] as Asset;
    //      ^?
    if (!assetData) {
      return {
        status: false,
        message: "Asset Data not found",
      };
    }
    // create the entity
    const asset = new Asset({
      id: assetData.id,
      currency: assetData.currency,
      institution_id: assetData.institution_id,
      name: assetData.name,
      type: assetData.type,
      value: assetData.value,
    });
    console.log("🟨 - ASSET: ", asset);
    // check against policies

    asset.setValue(
      this.args.value,
      this.args.currency ? this.args.currency : undefined
    );

    // save to writeDB
    this.db.put(asset);

    // emit the event in the eventEmitter
    this.eventEmitter.emit("AssetUpdated", { asset, ts: Date.now() });

    return {
      status: true,
    };
  }
}
