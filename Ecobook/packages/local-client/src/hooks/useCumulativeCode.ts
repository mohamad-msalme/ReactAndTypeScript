import { useTypedSelector } from "../hooks";


const showFunc = `
    import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root)
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        }
    `;
const showFuncNoop = `var show = () => {}`;

export const useCumulativeCode = (currCellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderCells = order.map((id) => data[id]);
    const cumulativeCode = [];
    for (let c of orderCells) {
      if (c.type === 'code') {
        c.id === currCellId ? cumulativeCode.push(showFunc) : cumulativeCode.push(showFuncNoop);
        cumulativeCode.push(c.content);
      }
      if (c.id === currCellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
}