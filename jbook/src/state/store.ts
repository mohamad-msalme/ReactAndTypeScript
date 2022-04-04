import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers';
import { ActionType } from "./types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export type TypedDispatch = typeof store.dispatch;
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
});