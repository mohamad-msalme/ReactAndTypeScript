import produce from "immer";
import { ActionType, Action } from "../types";

interface BundlesState {
  [key: string]: BundleStateCell | undefined
}

export interface BundleStateCell {
  loading: boolean;
  code: string;
  err: string;
}

const initialState: BundlesState = {};


const bundleReducer = produce<(state: BundlesState | undefined, action: Action) => BundlesState>((state: BundlesState = initialState, action: Action) => {
  switch(action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      }
      return state;
    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.cellId] = action.payload.bundleResult;
      return state;
    default:
      return state;
  }
})
export default bundleReducer;