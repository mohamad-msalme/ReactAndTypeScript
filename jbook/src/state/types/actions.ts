import { CellType, ActionType } from "./";
import { BundleStateCell } from "../reducers/bundleReducer";

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  }
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  }
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START,
  payload: {
    cellId: string;
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE,
  payload: {
    cellId: string;
    bundleResult: BundleStateCell
  }
}

export type Action = 
  | MoveCellAction 
  | DeleteCellAction 
  | InsertCellAfterAction 
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;