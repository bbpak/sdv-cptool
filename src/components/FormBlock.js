import React, { Component } from 'react'

export default class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false
    }
  }

  render() {
    const { field, value } = this.props
    let item;

    if (item === "Format") 
      item = <input type="text" />

    return (
      <div className="form-block line">
        <div className="field-label">{field}</div>  
      </div>
    )
  }
}
