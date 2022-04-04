import './Divider.css';
import React from 'react';
import { useActions } from '../../hooks';
import { BtnsConfig, EcoBookButton } from '../../shared/Buttons';

interface DividerProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
const Divider: React.FC<DividerProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  const btnsConfig: BtnsConfig[] = [{
    className: 'button is-rounded is-primary is small',
    label: 'Code',
    icon: 'fas fa-plus',
    onClick: () => insertCellAfter(previousCellId, 'code')
  }, {
    className: 'button is-rounded is-primary is small',
    label: 'Text',
    icon: 'fas fa-plus',
    onClick: () => insertCellAfter(previousCellId, 'text')
  }];

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <EcoBookButton btnsConfig={btnsConfig}/>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default Divider;