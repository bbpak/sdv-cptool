import React, { Component } from 'react'
import DropBox from './DropBox'
import _ from 'lodash'

export default class ContentEditor extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="content-editor">
        <div className="content-form">

          <DropBox />
        </div>
      </div>
    )
  }
}
