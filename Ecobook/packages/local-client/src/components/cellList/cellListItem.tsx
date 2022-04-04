import React from 'react';
import { Cell } from '../../state/types';
import { CodeCell, TextEditor, ActionBar} from '../'
import './cellListItem.css';

interface CellListItemPros {
  cell: Cell
}
const cellListItem: React.FC<CellListItemPros> = ({ cell }) => {
  const renderCell = () => {
    switch(cell.type) {
      case 'code':
        return <CodeCell cell={cell} />
      case 'text':
        return <TextEditor cell={cell} />
    }
  }

  return (
    <div className='cell-list-item'>
      <ActionBar id={cell.id} />
      {renderCell()}
    </div>
  )
};

export default cellListItem;