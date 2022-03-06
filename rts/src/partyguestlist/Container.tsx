import React, { useState } from 'react';

interface ContainerProps {
  title?: string;
}
const Container: React.FunctionComponent<ContainerProps> = ( { title } ) => {
  const [guests, addGuest] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const renderListOfGuest = (): JSX.Element[] | null => guests.map((guest) => <li key={guest}>{guest}</li>);

  return (
  <React.Fragment>
    <h3>Guest List</h3>
    <ul>{renderListOfGuest()}</ul>
    <input type='text' value={text} onChange={(e) => setText(e.target.value)}></input>
    <button type='submit' onClick={() => text && addGuest([...guests, text])}>{title}</button>
  </React.Fragment>
  ) 
}

Container.defaultProps = {
  title: 'Add Guest',
}

export default Container;