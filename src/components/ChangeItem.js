import React, { Component } from 'react'
import { Form, Select, Icon, Input } from 'semantic-ui-react'
import _ from 'lodash'

// Represents an item in the Changes array
export default class ChangeItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false,
      showOptional: false,
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

  handleShowOptional = () => {
    this.setState({ showOptional: !this.state.showOptional })
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
    const { contentData } = this.props
    const { data } = this.state
    const fields = contentData[data.action]

    return (
      <div>
        {_.map(_.keys(fields), (field, i) => {
          return field === 'Optional' ? (
            this.renderOptionalFields(fields, field, i)
          ) : (
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

  // Iterate contentData objects and render inputs according to type
  // TODO: Use recursion instead of nested loops
  renderOptionalFields = (fields, field, i) => {
    return (
      <div key={i}>
        <Icon
          link
          title="optional fields"
          style={{ width: '101.25%', position: 'relative', top: '-0.5em' }}
          onClick={this.handleShowOptional}
          name="ellipsis horizontal"
        />
        <div
          style={
            this.state.showOptional ? { diplay: 'block' } : { display: 'none' }
          }
        >
          {/* Iterate Optional Fields */}
          {_.map(_.keys(fields[field]), (optField, j) => {
            let obj = fields[field]

            // Selection for arrays
            if (Array.isArray(obj[optField])) {
              return (
                <Form.Field inline className="field-item" key={i}>
                  <label className="field-label">{optField}</label>
                  <Select
                    className="field-input"
                    options={_.map(obj[optField], (option, i) => {
                      return {
                        key: i,
                        text: option,
                        value: option
                      }
                    })}
                    onChange={this.handleDataChange}
                  />
                </Form.Field>
              )
              // Objects with more keys/values
            } else if (typeof obj[optField] === 'object') {
              let width = Math.floor(16 / _.keys(obj[optField]).length)

              return _.keys(obj[optField]).length > 1 ? (
                <Form.Field
                  style={{ padding: 0 }}
                  className="field-item"
                  key={j}
                >
                  <label
                    style={{ paddingRight: '1em' }}
                    className="field-label"
                  >
                    {optField}
                  </label>
                  <Form.Group key={j} className="field-group">
                    {_.map(_.keys(obj[optField]), (objKey, k) => {
                      return (
                        <Form.Field inline width={width} key={k}>
                          <label className="field-label">{objKey}</label>
                          <Input
                            className="field-input"
                            type="text"
                            value={obj[optField][objKey]}
                          />
                        </Form.Field>
                      )
                    })}
                  </Form.Group>
                </Form.Field>
              ) : (
                <Form.Field inline className="field-item" key={j}>
                  <label className="field-label">{optField}</label>
                  <Input
                    className="field-input"
                    type="text"
                    value={obj[optField]}
                  />
                </Form.Field>
              )
            } else {
              return (
                <Form.Field inline className="field-item" key={j}>
                  <label className="field-label">{optField}</label>
                  <Input
                    className="field-input"
                    type="text"
                    value={obj[optField].value}
                  />
                </Form.Field>
              )
            }
          })}
        </div>
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
