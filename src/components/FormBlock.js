import React, { Component } from 'react'
import FormField from './FormField'
import _ from 'lodash'

export default class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false
    }
  }

  handleCollapseToggle = () => {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render() {
    const {style, children} = this.props
    const field = _.first(children)

    return (
      <div style={style} className="form-block">
        <FormField label={`${field.props.value}: ${field.props.name}`} />
        <i className="material-icons collapsible" onClick={this.handleCollapseToggle}>{this.state.isCollapsed ? 'expand_more' : 'expand_less'}</i>
        {!this.state.isCollapsed && children}
      </div>
    )
  }
}
