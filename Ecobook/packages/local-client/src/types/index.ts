import { Action } from "../state/types";

export type BtnsConfig = {
  icon: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Action;
  label?: string;
  className?: string;
}