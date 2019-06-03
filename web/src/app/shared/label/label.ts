import { ILabel } from './';

class Label implements ILabel {
  constructor(public value,
    public i18n=true,
    public alignment="left") { }
  toString = () => this.value;
}

abstract class LabelFactory {
  public static get(rawLabel: any): ILabel {

    let label = rawLabel;

    if (!rawLabel || !rawLabel.value)
      rawLabel = { value: '', i18n: false }

    if (typeof label === 'string')
      rawLabel = { value: label }

    return new Label(
      rawLabel.value,
      rawLabel.i18n,
      rawLabel.alignment);
  }
}

export {
  Label,
  LabelFactory
}
