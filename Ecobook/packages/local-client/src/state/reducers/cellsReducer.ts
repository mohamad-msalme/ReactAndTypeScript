import { ActionType, Action, Cell } from "../types";
import produce from 'immer';
interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const randomId = () => Math.random().toString(36).substring(2, 5);

const cellReducer = produce<(state: CellState | undefined, action: Action) => CellState>((state: CellState = initialState, action: Action ) => {
  switch(action.type) {
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((item) => item !== action.payload);
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      }
      state.data[cell.id] = cell;
      const currIndex = state.order.findIndex((id) => id === action.payload.id); 
      currIndex < 0 ? state.order.unshift(cell.id) : state.order.splice(currIndex + 1, 0, cell.id)
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index -1 : index + 1;
      if ( targetIndex < 0 || targetIndex > state.order.length - 1 ) return state;
      
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionType.UPDATE_CELL:
      const {id, content} = action.payload
      state.data[id].content = content;
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellState['data'])
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    default: return state;
  }
});
export default cellReducer;