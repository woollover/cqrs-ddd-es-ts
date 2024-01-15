import EventEmitter from "events";
import ICommand, { ICommandResponse } from "../commands/Command";
import CreateAsset from "../commands/asset_commands/CreateAsset";
import DBClient from "../db/DBClient";

export async function CommandRouter({
  _command,
  eventEmitter,
  writeDBClient,
}: {
  _command: ICommand;
  eventEmitter: EventEmitter;
  writeDBClient: DBClient;
}): Promise<ICommandResponse | Error> {
  switch (_command.command_name) {
    case "create.asset":
      console.log(`${_command.command_name} command received`);
      const handler = new CreateAsset({
        command_name: _command.command_name,
        args: _command.args,
        writeDBClient,
        eventEmitter,
      });
      return handler.execute();

    case "update.asset.value":
      throw new Error("command not implemented yet");

    default:
      throw new Error("Command not found");
  }
}
