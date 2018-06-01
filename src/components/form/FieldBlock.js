import React, { Component } from 'react'
import FormField from './FormField'
import { optionalFields, getDefaultsForAction } from '../../data/dataConstants'
import _ from 'lodash'

export default class FieldBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false,
      showOptionals: false
    }
  }

  handleToggleCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  handleToggleOptionals = () => {
    this.setState({ showOptionals: !this.state.showOptionals })
  }

  handleValueChange = (field, value) => {
    const { blockData, handleBlockDataChange, index } = this.props
    let newData

    if (field === 'Action') {
      newData = getDefaultsForAction(value)
    } else {
      newData = blockData
      newData[field] = value
    }
    handleBlockDataChange(newData, index)
  }

  handleRemoveBlock = () => {
    const { index, handleBlockDataChange } = this.props
    handleBlockDataChange(null, index)
  }

  _isEmpty = val => {
    if (typeof val !== 'object') {
      return val === undefined || val === null || val === ''
    }

    return Object.keys(val).every(x => {
      return val[x] === '' || val[x] === null || val[x] === undefined
    })
  }

  render() {
    const { style, title, blockData, isCollapsible, className } = this.props
    const { isCollapsed, showOptionals } = this.state

    return (
      <div style={style} className={`field-block ${className}`}>
        {isCollapsible && (
          <div>
            <pre
              title={title}
              className={`line ${isCollapsible && 'collapsible'}`}
              style={style}
              tabIndex="0"
              onClick={this.handleToggleCollapse}
            >
              <div className="field-label">
                <span style={{ color: 'yellowgreen' }}>
                  {`${blockData['Action']}: `}
                </span>
                <span style={{ color: '#AC80FF' }}>
                  {`${blockData['Target'] || ''}`}
                </span>
              </div>
            </pre>
            <i
              title="remove block"
              className="material-icons field-block-control remove"
              onClick={this.handleRemoveBlock}
            >
              {'clear'}
            </i>
            {!isCollapsed && (
              <i
                title="toggle optional fields"
                className="material-icons field-block-control more"
                onClick={this.handleToggleOptionals}
              >
                {'more_horiz'}
              </i>
            )}
          </div>
        )}
        {!isCollapsed &&
          _.map(_.keys(blockData), (field, i) => {
            if (
              _.includes(optionalFields, field) &&
              this._isEmpty(blockData[field]) &&
              !showOptionals
            )
              return
            return (
              <FormField
                key={i}
                className={className}
                field={field}
                value={blockData[field]}
                handleValueChange={this.handleValueChange}
              />
            )
          })}
      </div>
    )
  }
}
