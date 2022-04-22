import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CellListItem, Divider } from '../';
import './cellList.css';
import { useActions } from '../../hooks';
const CellList: React.FC = () => {
  const cells =  useTypedSelector(({ cells: { order, data}}) =>  order.map((id) => data[id]));
  const { fetchCells, saveCells } = useActions();
  React.useEffect(() => {
    fetchCells();
  }, [])

  // React.useEffect(() => {
  //   saveCells();
  // }, [JSON.stringify(cells)])
  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <Divider previousCellId={cell.id}/>
    </React.Fragment>
  ));

  return (
    <div className='cell-list'>
      <Divider forceVisible={renderedCells.length === 0}  previousCellId={null}/>
      {renderedCells}
    </div>
  )
};

export default CellList;