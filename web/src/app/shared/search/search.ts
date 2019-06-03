import { ISearchParam, ISearch } from './';

export class Search implements ISearch {
  constructor(public pattern = '', public params=[]) {}

  addParam(param: ISearchParam) {

    const existent: ISearchParam = this.params.find(
      (curr) => this.__findParam(curr, param));

      if (!existent) {
      this.params.push(param);
      return;
    }

    existent.merge(param);
  }

  removeParam(param: ISearchParam) {

    const existent: ISearchParam = this.params.find(
      (curr) => this.__findParam(curr, param, true));

      if (!existent)
      return;

    existent.difference(param);
  }

  setParam(param: ISearchParam) {

    const existent: ISearchParam = this.params.find(
      (curr) => this.__findParam(curr, param));

    if (!existent) {
      this.addParam(param);
      return;
    }

    existent.value = param.value;
  }

  setPattern(query: string) {
    this.pattern = query;
  }

  private __findParam(curr: ISearchParam,
    next: ISearchParam,
    byValue: boolean = false): boolean {

    const sameKey = curr.key == next.key;

    if (!byValue)
      return sameKey;

    const sameValue = curr.value.filter(v => next.value.includes(v));

    return sameKey && (!!sameValue.length);
  }
}
