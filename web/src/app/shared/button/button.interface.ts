import { ILabel } from './../label';
import { IAction } from './../action';

export interface IButton {
  label: ILabel;
  clazz: string;
  icon?: string;
  enabled?: Function;
  visible?: Function;
  show?: Function;
  action?: IAction;
  children?: IButton[];
}
