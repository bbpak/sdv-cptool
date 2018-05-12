import React, { Component } from 'react'
import FormBlock from './FormBlock'
import FormField from './FormField'
import DropBox from './DropBox'
import { fileTypeData } from '../data/contentData'
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

  getValueForFile = (type, name, parent) => {  
    let value

    // Handle specific cases
    if (type === 'xnb') {
      if (!isNaN(name))
        value = this.getOptionForType('tbin')
      else
        value = this.getOptionForType(type)
    }
    else {
      _.map(fileTypeData.files, nameStr => {
        if (name.includes(nameStr)) {
          value = this.getOptionForType(fileTypeData.files[nameStr])
          return
        }
      })
      if (!value)
        value = this.getOptionForType(_.get(fileTypeData.directories, parent))
    }
  
    return value
  }

  getOptionForType = type => {
    // Tile map
    if (type === 'tbin') 
      return 'Load'
    // Image
    if (type === 'png')
      return 'EditImage'
    // Probably a packed yaml file
    if (type === 'xnb')
      return 'EditData'
    else
      return 'EditImage'
  }

  renderForm() {
    const { importData } = this.state
    const lineStyle = {borderTop: '1  px solid #454545'}
    const innerLineStyle = {paddingLeft: '2em'}

    return (
      <div>
        <FormField style={lineStyle} field="Format" form="text" value="1.3"/>
        {/*<FormField style={lineStyle} field="ConfigSchema" />*/}
        <FormField style={lineStyle} field="Changes" />
         
        {_.map(importData, (item, i) => { 
          const fullPath = item;
          const paths = fullPath.split('/')
          const file = paths.pop().split('.')

          const type = file.pop()
          const name = file.pop()
          const parent = paths.pop()
          const value = this.getValueForFile(type, name, parent)

          return (
            <FormBlock>
              <FormField
                key={i} 
                field="Action"
                value={value}
                name={name} 
                fullPath={item} 
                style={innerLineStyle}
              />
            </FormBlock>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="content-editor">
        <div className='content-form scrollbar'>
          {this.state.importData ? this.renderForm() : <DropBox onDrop={this.handleFileDrop} />}
        </div>
      </div>
    )
  }
}
