import { randomUUID } from "crypto";
import DBClient from "../db/DBClient";
import { EventType } from "./EventTypes";

export type EventConstructionParams = {
  event_name: EventType;
  aggregate_root_id: string;
  payload: any; // how can I type this one?
  command_id: string;
  id?: string;
  offset?: number;
};
export default class Event {
  // the actual shape being stored in the EventStore
  id: string;
  event_name: EventType;
  version: string = "1.0.0";
  offset: number | undefined;
  created_at: number; // timestamp of creation
  aggregate_root_id: string; // id of the aggregate root
  payload: any; // the payload of the event
  command_id: string; // the id of the original command, to pass in every stage of worki

  constructor(params: EventConstructionParams) {
    this.event_name = params.event_name;
    this.aggregate_root_id = params.aggregate_root_id;
    this.created_at = Date.now();
    this.payload = params.payload;
    this.command_id = params.command_id;
    this.id = params.id || "E_" + randomUUID();
    this.offset = params.offset ?? undefined;
  }
}
