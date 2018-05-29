import React, { Component } from 'react'
import FormField from './FormField'
import Dropdown from '../Dropdown'
import withStore from '../hocs/withStore'
import { hiddenFields } from '../../data/dataConstants'
import _ from 'lodash'

class FormBlock extends Component {
  constructor() {
    super()
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

  handleFieldDataChange = (field, data) => {
    const { blockData, handleBlockDataChange } = this.props
    let newData = blockData
    newData[field] = data
    handleBlockDataChange(newData)
  }

  handleRemoveBlock = () => {
    const { index, handleBlockDataChange } = this.props
    handleBlockDataChange(null, index)
  }

  render() {
    const { style, title, blockData } = this.props
    const { isCollapsed, showOptionals } = this.state

    return (
      <div style={style} className="form-block">
        <pre title={title} className="line  collapsible" style={style} tabIndex="0" onClick={this.handleToggleCollapse}>
          <div
            className="field-label"
          >
            <span style={{ color: 'yellowgreen' }}>{`${
              blockData['Action']
            }: `}</span>
            <span style={{ color: '#AC80FF' }}>{`${blockData['Target']}`}</span>
          </div>
        </pre>
        <i title="remove block" className="material-icons remove" onClick={this.handleRemoveBlock}>
          {'clear'}
        </i>
        {!isCollapsed &&(
        <i title="toggle optional fields" className="material-icons more" onClick={this.handleToggleOptionals}>
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
                fieldData={blockData[field]}
                handleFieldDataChange={this.handleFieldDataChange}
              />
            )
          })}
      </div>
    )
  }
}
const WrappedComponent = withStore(FormBlock)
export default WrappedComponent
