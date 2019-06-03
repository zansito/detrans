import { ILabel, LabelFactory } from './../label';
import { IAction, ActionFactory } from './../action';
import { IButton } from './button.interface';

class Button implements IButton {
  constructor(
    public label,
    public clazz='',
    public icon?,
    public enabled?,
    public visible?,
    public show?,
    public action?,
    public children=[]) { }
}
abstract class ButtonFactory {

  static get(rawButton: any): IButton {
    return new Button(
      LabelFactory.get(rawButton.label||{}),
      rawButton['class'],
      rawButton.icon,
      rawButton.enabled||function(){return true},
      rawButton.visible||function(){return true},
      rawButton.show||function(){return true},
      ActionFactory.get(rawButton.action),
      ButtonFactory.many(rawButton.children)
    );
  }

  static many(rawButtons: any[]): IButton[] {
    return Array.isArray(rawButtons) ? rawButtons.map(
      rawAction => ButtonFactory.get(rawAction)
    ) : [];
  }
}

export { IButton, Button, ButtonFactory }
