import React, { Component } from 'react'
import FormField from './FormField'
import withStore from './hocs/withStore'
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

  render() {
    const { style, children, title, getDataForField } = this.props
    const file = _.first(children).props.name

    return (
      <div style={style} className="form-block">
        <pre title={title} className="line" style={style} tabIndex="0">
          <div
            style={{
              color: 'yellowgreen',
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}
            className="field-label"
          >
            {`${getDataForField('Action')}: ${file}`}
          </div>
        </pre>
        <i
          className="material-icons collapsible"
          onClick={this.handleCollapseToggle}
        >
          {this.state.isCollapsed ? 'expand_more' : 'expand_less'}
        </i>
        {!this.state.isCollapsed && children}
      </div>
    )
  }
}
const WrappedComponent = withStore(FormBlock)
export default WrappedComponent
