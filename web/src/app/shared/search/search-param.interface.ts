export interface ISearchParam {
  key: string;
  value: Array<any>;

  merge?(param: ISearchParam);
  difference?(param: ISearchParam);
}
