import { IDatatableLayout } from './datatable-layout.interface';
import { IDatatableLayoutHeaderElement
} from './datatable-layout-header-element.interface';
import { DatatableLayoutHeaderElementsEnum
} from './datatable-layout-header-element.enum';

abstract class AbstractDatatableLayout implements IDatatableLayout {
  header: IDatatableLayoutHeaderElement[];
}

class DatatableDefaultLayout extends AbstractDatatableLayout {
  public header: IDatatableLayoutHeaderElement[] = [
    { element: DatatableLayoutHeaderElementsEnum.BUTTONS, size: 4 },
    { element: DatatableLayoutHeaderElementsEnum.FILTERS, size: 4 },
    { element: DatatableLayoutHeaderElementsEnum.SEARCH, size: 4 },
  ]
}

class DatatableLayout implements IDatatableLayout {
  constructor(public header: IDatatableLayoutHeaderElement[]) {
  }
}

abstract class DatatableLayoutFactory {
  public static get(rawLayout: any): IDatatableLayout {
    return new DatatableLayout(
      rawLayout.header
    );
  }

  public static getDefault(): IDatatableLayout {
    return new DatatableDefaultLayout();
  }
}

function isIDatatableLayout(obj: any): obj is IDatatableLayout {
  const props = ['header'];
  let valid: boolean = true;
  props.forEach((prop: string) => {
    if (!valid)
      return;
    valid = prop in obj;
  });
  return valid;
}

export {
  AbstractDatatableLayout,
  DatatableLayoutFactory,
  isIDatatableLayout
}
