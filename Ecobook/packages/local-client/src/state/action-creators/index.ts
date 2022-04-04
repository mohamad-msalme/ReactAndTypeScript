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
} from "../types";
import { BundleStateCell } from "../reducers/bundleReducer";

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