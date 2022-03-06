import React from 'react';
import Child from './Child'
const Parent: React.FC = () => {
  return <div>
    <Child color= 'green' onClick={() => console.log('Clicked')} />
  </div>
}
export default Parent;