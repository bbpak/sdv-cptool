import React, { Component } from 'react'
import _ from 'lodash'

export default class FormField extends Component {

  getInputForField = () => {
    const { field, defaultValue } = this.props
    let input;

    switch(field) {
      case 'Action':
        input = (
          <select className="field-input" defaultValue={defaultValue}>
            <option>Load</option>
            <option>EditImage</option>
            <option>EditData</option>
          </select>
        );
        break;
      case 'PathMode':
        input = (
          <select className="field-input" defaultValue={defaultValue}>
            <option>Replace</option>
            <option>Overlay</option>
          </select>
        );
        break;
      case 'Target':
      case 'FromFile':
      case 'LogName':
        input = (
          <input className="field-input" defaultValue={defaultValue} type="text"/>
        );
        break;
    }

    return input
  }

  render() {
    const { 
      field, 
      defaultValue, 
      options, 
      style, 
      title, 
      children,
      label 
    } = this.props

    let input = this.getInputForField()

    return (
      <pre title={title} className="line" style={style} tabIndex='0'>
        {label 
          ? 
            <div style={{color: 'yellowgreen', fontWeight: 'bold', fontStyle: 'italic'}} className="field-label">{label}</div>
          :
          <div>
            <div className="field-label">{field}</div>
            {input}
            {children}
          </div>
        }
      </pre>
    )
  }
}
