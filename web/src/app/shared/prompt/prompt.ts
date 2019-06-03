import { PromptLabelFactory } from './prompt-label';
import { IPrompt } from './prompt.interface';

class Prompt implements IPrompt {
  constructor(public title, public message, public answer = false, public size = 'sm') { }
}

abstract class PromptFactory {
  public static get(rawPrompt: any): IPrompt {

    if (!rawPrompt) { return; }

    if (typeof rawPrompt !== 'object') { rawPrompt = {}; }

     if (!rawPrompt.title) {
      rawPrompt.title = { value: 'styleguide.prompt.title' };
    }

    return new Prompt(
      PromptLabelFactory.get(rawPrompt.title),
      PromptLabelFactory.get(rawPrompt.message),
      rawPrompt.answer,
      rawPrompt.size
    );
  }
}

export { IPrompt, Prompt, PromptFactory }
