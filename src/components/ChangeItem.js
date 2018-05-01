import React, { Component } from 'react'
import { Form, Select, Icon, Input } from 'semantic-ui-react'
import _ from 'lodash'

// Represents an item in the Changes array
export default class ChangeItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false,
      data: props.itemData
    }
  }

  handleRemoveItem = () => {
    this.props.handleRemoveItem(this.props.index)
  }

  handleDataChange = (e, data) => {
    let newData = { action: data.value }
    this.setState({ data: newData })
    this.props.handleDataChange(newData)
  }

  handleCollapseClick = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  renderActions = () => {
    return (
      <Form.Field inline className="field-item">
        <label className="field-label">Action</label>
        <Select
          className="field-input"
          value={this.state.data.action}
          options={_.map(_.keys(this.props.contentData), (action, i) => {
            return {
              key: i,
              text: action,
              value: action
            }
          })}
          onChange={this.handleDataChange}
        />
      </Form.Field>
    )
  }

  // Options for the selected action
  renderFields = () => {
    const fields = this.props.contentData[this.state.data.action]

    return (
      <div>
        {_.map(_.keys(fields), (field, i) => {
          return field === 'Optional' ? null : (
            <Form.Field inline className="field-item" key={i}>
              <label className="field-label">{field}</label>
              <Input
                className="field-input"
                type="text"
                value={fields[field]}
              />
            </Form.Field>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="change-block">
        <div className="collapse-bar" onClick={this.handleCollapseClick}>
          <Icon
            style={{ width: '100%' }}
            name={this.state.isCollapsed ? 'angle down' : 'angle up'}
          />
          <Icon
            link
            name="remove"
            style={{ position: 'absolute', top: '0.5em', right: 0 }}
            onClick={this.handleRemoveItem}
          />
        </div>
        <div
          style={
            this.state.isCollapsed ? { display: 'none' } : { display: 'block' }
          }
        >
          {this.renderActions()}
          {this.renderFields()}
        </div>
      </div>
    )
  }
}
