import { EventEmitter } from "events";
import { CommandRouter } from "../command_router/CommandRouter";

export class CommandEventListener {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  registerCommandEventListener() {
    console.log("✅ - Commands bus ready");

    this.eventEmitter.on("create.asset", async (payload) => {
      /**
       * The commandRouter handles the command and check validity of the request against the
       * domain contraints, applies the command and emits the domain event
       */
      let response = await CommandRouter(payload);

      if (response instanceof Error) {
        throw response;
      }
    });
  }
}
