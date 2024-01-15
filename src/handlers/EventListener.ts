import { EventEmitter } from "events";

export class DomainEventsListener {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  registerDomainEventListener() {
    console.log("✅ - Domain Events bus ready");

    this.eventEmitter.on("AssetAdded", (payload) => {
      console.log("Domain EVENT Received", { payload });
    });
  }
}
