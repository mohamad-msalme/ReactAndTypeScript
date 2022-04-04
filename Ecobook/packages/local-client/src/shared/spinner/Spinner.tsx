import React from 'react';
import './Spinner.css'
export const Spinner: React.FC = () => {
  return (
      <div className="spinner-cover">
        <progress className="progress is-small is-primary" max="100">
          Loading
        </progress>
      </div>
  )
};