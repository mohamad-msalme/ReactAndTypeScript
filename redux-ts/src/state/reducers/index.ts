import { combineReducers } from "redux";
import repositriesReducer from "./repositriesReducer";

const reducers = combineReducers({
  repositires: repositriesReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;