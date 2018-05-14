import React, { Component } from 'react'
import withStore from '../hocs/withStore'
import _ from 'lodash'

class FormField extends Component {
  constructor(props) {
    super()
    this.state = {
      value: props.value
    }
  }

  handleInputChange = e => {
    const { field, value, handleDataChange } = this.props
    this.setState({ value: e.target.value })
    handleDataChange(field, e.target.value)
  }

  getInputForField = () => {
    const { field, value } = this.props
    let input

    switch (field) {
      case 'Action':
        input = (
          <select
            className="field-input"
            value={this.state.value}
            onChange={this.handleInputChange}
          >
            <option>Load</option>
            <option>EditImage</option>
            <option>EditData</option>
          </select>
        )
        break
      case 'PatchMode':
        input = (
          <select
            className="field-input"
            value={this.state.value}
            onChange={this.handleInputChange}
          >
            <option>Replace</option>
            <option>Overlay</option>
          </select>
        )
        break
      case 'Enabled':
        input = (
          <select
            className="field-input"
            value={this.state.value}
            onChange={this.handleInputChange}
          >
            <option>true</option>
            <option>false</option>
          </select>
        )
        break
      case 'FromArea':
        input = (
          <div style={{ paddingLeft: '0.2em', display: 'inline' }}>
            <span className="inner-field">
              X<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Y<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Width<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Height<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
          </div>
        )
        break
      case 'ToArea':
        input = (
          <div style={{ paddingLeft: '1.35em', display: 'inline' }}>
            <span className="inner-field">
              X<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Y<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Width<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
            <span className="inner-field">
              Height<input
                className="field-input"
                value={this.state.value}
                type="text"
                onChange={this.handleInputChange}
              />
            </span>
          </div>
        )
        break
      case 'Target':
      case 'FromFile':
      case 'LogName':
      case 'Fields':
      case 'When':
      case 'Format':
        input = (
          <input
            className="field-input"
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        )
        break
    }

    return input
  }

  render() {
    const { field, value, options, style, title, label } = this.props
    let input = this.getInputForField()

    return (
      <pre title={title} className="line" style={style} tabIndex="0">
        <div className="field-label">{field}</div>
        {input}
      </pre>
    )
  }
}
const WrappedComponent = withStore(FormField)
export default WrappedComponent
