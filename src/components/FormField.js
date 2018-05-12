import React, { Component } from 'react'
import _ from 'lodash'

export default class FormBlock extends Component {
  constructor() {
    super()
  }

  render() {
    const { field, value, form, options, style } = this.props
    let item 

    if (form === "select") {
      item = (
        <select className="field-input" name={`${field}:`}>
          {_.map(options, option => {
            return <option>{option}</option>
          })}
        </select>
      )
    }
    else if (form === "text") {
      item = <input className="field-input" type="text" value={value} />
    }
    
    return (
      <div className="line" style={style}>
        <div className="field-label">{`${field}:`}</div>
        {item}
      </div>
    )
  }
}
