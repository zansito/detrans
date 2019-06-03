import { ISearchParam } from './';

export interface ISearch {
  pattern: string;
  params: ISearchParam[];

  addParam(param: ISearchParam);
  removeParam(param: ISearchParam);
  setParam(param: ISearchParam);
  setPattern(query: string);
}
