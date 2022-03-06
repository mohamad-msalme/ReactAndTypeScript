import React, { useState, useRef, useEffect } from 'react';
import {User, users} from './Data';

export const Container: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [user, setUser] = useState<User>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(!inputRef.current) return;
    inputRef.current.focus();
  }, [])
  const renderResult = () => {
    if (user) {
      return (
        <>
          <p>{`Name: ${user.firstName}`}</p>
          <p>{`Age: ${user.age}`}</p>  
        </>
      )
  }
}
  return (
    <div>
      <h3>Find User</h3>
      <input ref={inputRef} value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder='Search By name'></input>
      <button type='submit' onClick={() => text && setUser(users.find((item) => item.firstName.toLowerCase() === text.toLowerCase()))}>Find</button>
      <div style={{marginTop: '20px'}}>
        <h3>User Detail</h3>
        <div>
          {renderResult()}
        </div>
      </div>
    </div>
  )
}
export default Container;