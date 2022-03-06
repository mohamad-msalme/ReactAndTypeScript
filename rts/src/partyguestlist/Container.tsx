import React, { useState } from 'react';

interface ContainerProps {
  title?: string;
  buttonLabel?: string;
  inputLabel?: string;
}
const Container: React.FunctionComponent<ContainerProps> = ( { title, buttonLabel, inputLabel } ) => {
  const [guests, addGuest] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const renderListOfGuest = (): JSX.Element[] | null => guests.map((guest) => <li key={guest}>{guest}</li>);
  const onClickAdd = (): void => {
    if (text) {
      addGuest([...guests, text]);
      setText('');
    }
  }

  return (
  <React.Fragment>
    <h3>{title}</h3>
    <ul>{renderListOfGuest()}</ul>
    <label htmlFor="guest-input">{inputLabel}</label>
    <input type='text' id="guest-input" value={text} onChange={(e) => setText(e.target.value)}></input>
    <button type='submit' onClick={onClickAdd}>{buttonLabel}</button>
  </React.Fragment>
  ) 
}

Container.defaultProps = {
  title: 'Guest List',
  buttonLabel: 'Add Guest',
  inputLabel: 'Guest Name:'
}

export default Container;