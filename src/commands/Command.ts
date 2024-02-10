export interface ICommandResponse {
  status: boolean;
}
export default interface ICommand<T> {
  command_name: string;
  args: T;
  execute: () => ICommandResponse;
}

export interface ICommandConfig {
  command_name: string;
  args: any;
}
