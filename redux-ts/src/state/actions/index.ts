export interface SearchRepositiresAction {
  type: 'search_repositires'
}
export interface SearchRepositiresSuccess {
  type: 'search_repositires_success';
  payload: string[];
}
export interface SearchRepositiresError {
  type: 'search_repositires_error';
  payload: string;
}
export type Action = SearchRepositiresAction | SearchRepositiresSuccess | SearchRepositiresError