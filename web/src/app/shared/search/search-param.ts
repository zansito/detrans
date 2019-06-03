import { ISearchParam } from './';

export class SearchParam {
  constructor(public key, public value) {
    this.value = this.__arrayIt(value);
  }

  merge(param: ISearchParam) {
    this.value = [...this.value, ...param.value];
  }

  difference(param: ISearchParam) {
    let next = new Set(param.value);
    this.value = this.value.filter(v => !next.has(v));
  }

  private __arrayIt(value: any| any[]) {
    return Array.isArray(this.value) ?
      this.value :
      [this.value];
  }
}
