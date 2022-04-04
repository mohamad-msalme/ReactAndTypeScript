import { useTypedSelector } from "../hooks";

export const useCumulativeCode = (currCellId: string) => {

  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderCells = order.map((id) => data[id]);

    const cumulativeCode = [];
    for (let c of orderCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content);
      }
      if (c.id === currCellId) {
        break;
      }
    }
    return cumulativeCode;
  })
}