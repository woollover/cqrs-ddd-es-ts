import { EventEmitter } from "events";
import Event from "../events/Event";
import EventStoreClient from "../EventStore/EventStoreClient";
import DBClient from "../db/DBClient";
import { AssetReadModel } from "../projections/AssetReadModel";
import { Banks } from "../constants/Banks";
import { CurrencyRates } from "../constants/Rates";

export class DomainEventsListener {
  private eventEmitter: EventEmitter;
  private eventDB: EventStoreClient;
  private readDB: DBClient;

  constructor(
    eventEmitter: EventEmitter,
    eventDB: EventStoreClient,
    readDB: DBClient
  ) {
    this.eventEmitter = eventEmitter;
    this.eventDB = eventDB;
    this.readDB = readDB;
  }

  registerDomainEventListener() {
    console.log("✅ - Domain Events bus ready");

    this.eventEmitter.on("AssetAdded", (payload) => {
      console.log("Domain EVENT Received", payload);
      // create the aggregate
      //const factory = new AssetAggregateFactory();

      // save the event in the event store
      const event = new Event({
        event_name: "asset_added",
        aggregate_root_id: payload.asset.id,
        command_id: payload.command_id,
        payload: payload,
      });

      console.log("✅ - event created: ", event);
      
      this.eventDB.put(event);
      // create the projection
      const readAssetModel = new AssetReadModel({
        asset: payload.asset,
        banks: Banks,
        rates: CurrencyRates,
      });

      // save in the read DB
      this.readDB.put(readAssetModel);
    });
  }
}
