import { IPromptLabel } from './';

export interface IPrompt {
  title: IPromptLabel;
  message: IPromptLabel;
  answer: boolean;
  size: string;
}
