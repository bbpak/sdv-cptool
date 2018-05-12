import React, { Component } from 'react'

export default class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false
    }
  }

  render() {
    return (
      <div className="form-block">
        {this.props.children}
      </div>
    )
  }
}
