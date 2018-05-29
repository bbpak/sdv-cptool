import React, { Component } from 'react'
import _ from 'lodash'
import Divider from './misc/Divider'
import DropBox from './DropBox'
import FormBlock from './form/FormBlock'
import FormField from './form/FormField'
import DataParser from '../data/DataParser'
import { defaultData } from '../data/dataConstants'
import withStore from './hocs/withStore'

class ContentEditor extends Component {
  constructor() {
    super()
    this.state = {
      hasProcessedFiles: false
    }
  }

  componentDidMount() {
    console.log('Made with 🤔 by Bouhm')

    // Firefox still doesn't support custom scrollbar css :(
    if (!window.chrome || !window.chrome.webstore)
      console.log('Please use Chrome for optimal 𝒜 𝐸 𝒮 𝒯 𝐻 𝐸 𝒯 𝐼 𝒞 𝒮')

    document.addEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress = event => {
    switch( event.keyCode ) {
      case 27:
          this.handleFilesDrop({})
          document.removeEventListener("keydown", this.handleKeyPress)
          break;
      default: 
          break;
    }
  }

  handleFilesDrop = filesData => {
    let data = defaultData
    _.map(filesData, file => {
      data.Changes.push(DataParser.getDataForFile(file))
    })
    this.props.updateContentData(data)
    this.setState({ hasProcessedFiles: true })
  }

  // Block representing each object in Changes
  handleBlockDataChange = (blockData, i) => {
    const { contentData, updateContentData } = this.props
    let newData = contentData
    if (blockData) newData.Changes[i] = blockData
    else newData.Changes.splice(i, 1)

    updateContentData(newData)
  }

  handleAddBlock = () => {
    const { contentData, updateContentData } = this.props
    let newData = contentData

    // Use EditImage by default
    const newBlock = {
      Action: 'EditImage',
      Target: '',
      FromFile: '',
      FromArea: null,
      ToArea: null,
      PatchMode: null,
      When: null,
      LogName: null,
      Enabled: null,
    }

    newData.Changes.push(newBlock)
    updateContentData(newData)
  }

  renderForm = () => {
    const { contentData } = this.props
    const lineStyle = { borderLeft: 0 }

    return (
      <div>
        <FormField style={lineStyle} field="Format" fieldData="1.3" />
        <Divider
          borderStyle={{ border: 'none' }}
          dividerStyle={{ width: 'calc(100% - 3em)' }}
        />
        {/*<FormField field="ConfigSchema" />*/}
        <FormField style={lineStyle} field="Changes" />
        {_.map(contentData.Changes, (blockData, i) => {
          return (
            <div key={i}>
              <FormBlock
                index={i}
                blockData={blockData}
                handleBlockDataChange={this.handleBlockDataChange}
              />
              <Divider
                dividerStyle={{ left: '1em', width: 'calc(100% - 5em)' }}
              />
            </div>
          )
        })}
        <div
          className="form-block"
          style={{ cursor: 'pointer' }}
          onClick={this.handleAddBlock}
        >
          <pre className="line">
            <i title="new block" className="material-icons field-label add">{'add'}</i>
          </pre>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="content-editor">
        <form className="content-form scrollbar">
          {this.state.hasProcessedFiles ? (
            this.renderForm()
          ) : (
            <DropBox onDrop={this.handleFilesDrop} />
          )}
        </form>
      </div>
    )
  }
}

const WrappedComponent = withStore(ContentEditor)
export default WrappedComponent
