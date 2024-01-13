export interface ICommandResponse {
  status: boolean;
}
export default interface ICommand {
  execute: () => ICommandResponse;
}

export interface ICommandConfig {≥
  command_name: string;
  args: any;
}

export interface ICommandFactory {
  craftCommand: (config: ICommandConfig) => ICommand | Error;
}
