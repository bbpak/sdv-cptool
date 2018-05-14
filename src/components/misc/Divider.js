import React from 'react';

const Divider = props => {
  return (
    <div className="divider" >
      <div className="block-border" style={props.borderStyle} />
      <div className="block-divider" style={props.dividerStyle}/>
    </div>
  )
}

export default Divider;