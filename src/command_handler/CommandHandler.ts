import EventEmitter from "events";
import ICommand, { ICommandResponse } from "../commands/Command";
import CreateAsset from "../commands/asset_commands/CreateAsset";
import DBClient from "../db/DBClient";
import UpdateAssetValue from "../commands/asset_commands/UpdateAssetValue";

export async function CommandHandler({
  _command,
  eventEmitter,
  writeDBClient,
}: {
  _command: ICommand<any>;
  eventEmitter: EventEmitter;
  writeDBClient: DBClient;
}): Promise<ICommandResponse | Error> {
  let handler: any;
  switch (_command.command_name) {
    case "create.asset":
      console.log(`🟨 - ${_command.command_name} command received`);
      handler = new CreateAsset({
        command_name: _command.command_name,
        args: _command.args,
        writeDBClient,
        eventEmitter,
      });
      console.log("🟨 - HANDLER ", handler);
      return handler.execute();

    case "update.asset.value":
      console.log(`🟨 - ${_command.command_name} command received`);
      handler = new UpdateAssetValue({
        command_name: _command.command_name,
        args: _command.args,
        writeDBClient,
        eventEmitter,
      });
      console.log("🟨 - HANDLER ", handler);
      return handler.execute();

    default:
      throw new Error("Command not found");
  }
}
