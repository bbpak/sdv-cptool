import React from 'react';

const Loader = (props) => {
  return (
    <div className="loader">
      <h1>{props.messages[Math.floor(Math.random()*(props.messages.length))]}</h1>
    </div>
  )
}

export default Loader