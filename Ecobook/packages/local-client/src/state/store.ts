import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers';
import { middlewareSaveCells } from "./middleware/middlewareSaveCells";
export const store = createStore(reducers, {}, applyMiddleware(middlewareSaveCells, thunk));

export type TypedDispatch = typeof store.dispatch;