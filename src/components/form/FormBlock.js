import React, { Component } from 'react'
import FormField from './FormField'
import withStore from '../hocs/withStore'
import { optionalFields } from '../../data/dataConstants'
import _ from 'lodash'

class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false
    }
  }

  handleCollapseToggle = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  handleFieldDataChange = (field, data) => {
    const { blockData, handleBlockDataChange } = this.props
      let newData = blockData
      newData[field] = data
      handleBlockDataChange(newData)
  }

  render() {
    const { style, title, blockData } = this.props

    return (
      <div style={style} className="form-block">
        <pre title={title} className="line" style={style} tabIndex="0">
          <div
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}
            className="field-label"
          >
            <span style={{color: 'yellowgreen'}}>{`${blockData['Action']}: `}</span><span style={{color: '#AC80FF'}}>{`${blockData['Target']}`}</span>
          </div>
        </pre>
        <i
          className="material-icons collapsible"
          onClick={this.handleCollapseToggle}
        >
          {this.state.isCollapsed ? 'expand_more' : 'expand_less'}
        </i>
        {!this.state.isCollapsed && _.map(_.keys(blockData), (field, i) => {
          if (_.includes(optionalFields, field)) return
          return <FormField key={i} field={field} fieldData={blockData[field]} handleFieldDataChange={this.handleFieldDataChange} />
        })}
      </div>
    )
  }
}
const WrappedComponent = withStore(FormBlock)
export default WrappedComponent
