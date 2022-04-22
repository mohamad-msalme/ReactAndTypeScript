import { Action, ActionType } from "../types";
import { Dispatch } from "react";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";
export const middlewareSaveCells = ({dispatch, getState}: {getState: () => RootState, dispatch: Dispatch<Action>}) => {
  let timer: any;
  return (next: (actio: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.DELETE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250)
      }
    }
  }
}