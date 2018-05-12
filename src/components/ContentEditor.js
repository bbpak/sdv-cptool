import React, { Component } from 'react'
import FormBlock from './FormBlock'
import DropBox from './DropBox'
import _ from 'lodash'

export default class ContentEditor extends Component {
  constructor() {
    super()
    this.state = {
      importData: null, // Data of dropped directory
      exportData: {
        Format: "1.3",
        ConfigSchema: {},
        Changes: []
      }
    }
  }

  handleFileDrop = (importData) => {
    this.setState( {importData} )
  }

  renderForm() {
    const { importData } = this.state
    const test = ["1","2","3","4","5"]

    return (
      <div>
         <FormBlock field="Format" value="1.3" />
         <FormBlock field="Changes" />
        {_.map(test, item => {
          return (
             <FormBlock field={item} depth={1}/>
          )
        })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="content-editor">
        <div className='content-form'>
          {this.state.importData && <DropBox onDrop={this.handleFileDrop} />}
          {this.renderForm()}
        </div>
      </div>
    )
  }
}
