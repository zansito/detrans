import { PromptFactory } from './../prompt/prompt';
import { IAction } from './';

export class Action implements IAction {
  constructor(
    public command,
    public event='click',
    public args=[],
    public prompt?
  ) {}
}
export abstract class ActionFactory {

  static get(rawAction: any): IAction {
    return new Action(
      rawAction.command,
      rawAction.event,
      rawAction.args,
      PromptFactory.get(rawAction.prompt)
    );
  }

  static many(rawActions: any[]): IAction[] {
    return Array.isArray(rawActions) ? rawActions.map(
      rawAction => ActionFactory.get(rawAction)
    ) : [];
  }
}
