import React from 'react';
import { useActions } from '../../hooks' ;
import { EcoBookButton, BtnsConfig } from '../../shared/Buttons';
import './ActionBar.css'

interface ActionBarProps {
  id: string
}


const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const {moveCell, deleteCell} = useActions();

  const btnsConfig = [{
    icon: 'fas fa-arrow-up',
    onClick: () => moveCell(id, 'up'),
    className: 'button is-primary is-small',
  }, {
    icon: 'fas fa-arrow-down',
    onClick: () => moveCell(id, 'down'),
    className: 'button is-primary is-small',
  }, {
    icon: 'fas fa-times',
    onClick: () => deleteCell(id),
    className: 'button is-primary is-small',
  }] as BtnsConfig[]

  return (
    <div className='action-bar-wrapper'>
      <div className='action-bar'>
        <EcoBookButton btnsConfig={btnsConfig} />
      </div>
    </div>
  )
}

export default ActionBar;