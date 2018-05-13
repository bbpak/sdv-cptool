import React, { Component } from 'react'
import _ from 'lodash'

export default class FormBlock extends Component {
  constructor() {
    super()
    this.state = {
      isCollapsed: false
    }
  }

  render() {
    const {style, children} = this.props

    return (
      <div style={style} className="form-block">
        {children}
      </div>
    )
  }
}
