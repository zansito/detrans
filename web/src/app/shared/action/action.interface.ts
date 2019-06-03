import { IPrompt } from './../prompt';

export interface IAction {
  command: string;
  event: string;
  args?: any[];
  prompt?: IPrompt;
}
