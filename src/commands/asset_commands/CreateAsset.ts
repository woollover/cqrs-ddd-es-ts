import EventEmitter from "events";
import Asset from "../../aggregates/Asset";
import ICommand from "../Command";
import DBClient from "../../db/DBClient";
import { CurrencyRates } from "../../constants/Rates";

export default class CreateAsset implements ICommand {
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
    args: any; // how can I type this dynamically?
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
    });

    // check against policies
    if (Object.keys(CurrencyRates).includes(this.args.currency) == false) {
      throw new Error(
        "Validation error: you are using a currency that is not supported"
      );
    }

    // save to writeDB
    this.db.put(asset);

    // emit the event in the eventEmitter
    this.eventEmitter.emit("AssetCreated", { asset, ts: Date.now() });

    return {
      status: true,
    };
  }
}
