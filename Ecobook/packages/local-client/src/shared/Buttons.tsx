import React from 'react';
import { Action } from '../state';

export type BtnsConfig = {
  icon: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Action;
  label?: string;
  className?: string;
}


interface ActionBarButtonProps {
  btnsConfig: BtnsConfig[]
}

export const  EcoBookButton: React.FC<ActionBarButtonProps> = ({ btnsConfig }) => {
  const buttons = btnsConfig.map((btn, ind) => (
    <button key={btn.icon + ind} className={btn.className} onClick={btn.onClick}>
      <span className='icon'>
        <i className={btn.icon}></i>
      </span>
      {btn.label && <span>{btn.label}</span>}
    </button>
  ))
  return (
    <React.Fragment>
      {buttons}
    </React.Fragment>
  )
}