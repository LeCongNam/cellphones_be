export interface GetParams {
  _limit: number | 10;
  _page: number | 0;
  _sort: 'DESC' | 'ASC';
  _filter: object;
}

export enum KeyDefaultParams {
  _limit = '_limit',
  _page = '_offset',
  _sort = '_sort',
  _filter = '_filter',
}

export interface BaseParams {
  _limit: number;
  _offset: number | 10;
  _sort: 'DESC' | 'ASC';
  _filter: Array<any>;
  _search: Array<object>;
}

export interface BaseController {
  create(data: any): any;
  update(data: any): any;
  delete(data: any): any;
  findOne(id: string | number): any;
  findAll(params: GetParams): any;
}
