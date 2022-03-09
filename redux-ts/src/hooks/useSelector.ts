import { useSelector as _useSelector   } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;