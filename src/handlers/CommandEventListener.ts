import { EventEmitter } from "events";
import { CommandHandler } from "../command_handler/CommandHandler";
import { WriteDB } from "..";
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
      console.log("PAYLOAD RECEIVED", payload);
      let response = await CommandHandler({
        _command: payload,
        eventEmitter: this.eventEmitter,
        writeDBClient: WriteDB,
      });

      if (response instanceof Error) {
        throw response;
      }
    });
  }
}
