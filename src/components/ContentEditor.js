import React, { Component } from 'react'
import FormBlock from './FormBlock'
import FormField from './FormField'
import DropBox from './DropBox'
import Divider from './Divider'
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

  componentDidMount() {
    console.log("Made with by 🤔 Bouhm")
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
      _.map(_.keys(fileTypeData.files), nameStr => {
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

  // Fields that are dependent on the Action
  renderActionFields = (value, name, fullPath) => {
    let fields;

    if (value === 'Load')
      fields = (
        <div>
          <FormField field="FromFile" />
        </div>
      )
    else if (value === 'EditImage')
      fields = (
        <div>
          <FormField field="FromFile" />
          <FormField field="FromArea" />
          <FormField field="ToArea" />
          <FormField field="PatchMode" />
        </div>
      ) 
    else if (value === 'EditData')
      fields = (
        <div>
          <FormField field="Fields" />
          <FormField field="Entries" />
        </div>
      )
    
    return (
      <FormBlock>
        <FormField
          field="Action"
          defaultValue={value}
          name={name} 
          fullPath={fullPath} 
        />
        <FormField field="Target" />
        {fields}
        <FormField field="LogName" />
        <FormField field="Enabled" />
        <FormField field="When" />
      </FormBlock>
    )
    
  }

  renderForm = () => {
    const { importData } = this.state
    const lineStyle = {borderLeft: 0}

    return (
      <div>
        <FormField style={lineStyle} field="Format" defaultValue="1.3" />
        <Divider borderStyle={{border: 'none'}} dividerStyle={{width: 'calc(100% - 3em)'}} />
        {/*<FormField title="This one's a bit more complex not sure how to simplify it" field="ConfigSchema" />*/}
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
            <div key={i}>
              {this.renderActionFields(value, name, fullPath)}
              <Divider dividerStyle={{left: '1em', width: 'calc(100% - 5em)'}} />
            </div>
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
