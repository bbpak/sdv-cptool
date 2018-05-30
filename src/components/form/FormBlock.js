import React, { Component } from 'react'
import FormField from './FormField'
import withStore from '../hocs/withStore'
import { optionalFields, getDefaultsForAction } from '../../data/dataConstants'
import _ from 'lodash'

class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false,
      showOptionals: false,
      hiddenFields: optionalFields
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
    const { hiddenFields } = this.state
    let newData

    if (field === 'Action') {
      newData = getDefaultsForAction(value)
    } else {
      newData = blockData
      newData[field] = value
    }
    handleBlockDataChange(newData, index)

    // Unhide optional field if value is defined
    if (_.includes(optionalFields, field)) {
      let newHiddenFields = hiddenFields

      if (
        value === undefined ||
        value === null ||
        value === '' ||
        _.isEmpty(value)
      ) {
        newHiddenFields.push(field)
      } else {
        newHiddenFields.splice(_.indexOf(field), 1)
      }

      this.setState({ hiddenFields: newHiddenFields })
    }
  }

  handleRemoveBlock = () => {
    const { index, handleBlockDataChange } = this.props
    handleBlockDataChange(null, index)
  }

  render() {
    const { style, title, blockData } = this.props
    const { isCollapsed, showOptionals, hiddenFields } = this.state

    return (
      <div style={style} className="form-block">
        <pre
          title={title}
          className="line  collapsible"
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
          className="material-icons remove"
          onClick={this.handleRemoveBlock}
        >
          {'clear'}
        </i>
        {!isCollapsed && (
          <i
            title="toggle optional fields"
            className="material-icons more"
            onClick={this.handleToggleOptionals}
          >
            {'more_horiz'}
          </i>
        )}
        {!isCollapsed &&
          _.map(_.keys(blockData), (field, i) => {
            if (_.includes(hiddenFields, field) && !showOptionals) return
            return (
              <FormField
                key={i}
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
const WrappedComponent = withStore(FormBlock)
export default WrappedComponent
