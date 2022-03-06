import React from 'react';

interface ChildProps {
  color: string;
  onClick: () => void;
}

const Child: React.FC<ChildProps> = ({ color }) => {
  return <div style={{ color: color }}>
    Hello world
  </div>
}
export default Child;