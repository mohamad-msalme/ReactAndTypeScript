import {
  CellType,
  Direction,
  ActionType,
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  BundleStartAction,
  BundleCompleteAction,
  InsertCellAfterAction,
  Cell,
  Action
} from "../types";
import { BundleStateCell } from "../reducers/bundleReducer";
import axios from "axios";
import { Dispatch } from "react";
import { RootState } from "../reducers";

/**
 * 
 * @param id 
 * @param content 
 * @returns 
 */
export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
};
/**
 * 
 * @param id 
 * @returns 
 */
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  }
};
/**
 * 
 * @param id 
 * @param direction 
 * @returns 
 */
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    }
  }
};
/**
 * 
 * @param id string
 * @param type CellType
 * @returns InsertCellBefoereAction
 */
export const insertCellAfter = (id: string | null, type: CellType): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  }
};
/**
 * 
 * @param cellId 
 * @returns 
 */
export const bundleStartAction = (cellId: string): BundleStartAction => {
  return {
    type: ActionType.BUNDLE_START,
    payload: {
      cellId
    }
  }
};
export const bundleCompleteAction = (cellId: string, bundleResult: BundleStateCell): BundleCompleteAction => {
  return {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundleResult,
    }
  }
}

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch( {
      type: ActionType.FETCH_CELLS
    });
    try {
      const { data }: { data: Cell[]} = await axios.get('/cells');
      dispatch( {
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data
      })
    } catch (_error) {
      const error = _error as { message: string};
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message
      })
    }
  }
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: { data, order } } = getState();
    const cells = order.map((id) => data[id]);
    debugger;
    try {
      await axios.post('/cells', { cells });
    } catch (_error) {
      const error = _error as { message: string};
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message
      })
    }
  }
}