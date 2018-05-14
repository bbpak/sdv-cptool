import React, { Component } from 'react'
import _ from 'lodash'
import Divider from './misc/Divider'
import DropBox from './DropBox'
import FormBlock from './form/FormBlock'
import FormField from './form/FormField'
import DataManager from '../data/DataManager'
import withStore from './hocs/withStore'
class ContentEditor extends Component {
  constructor() {
    super()
    this.state = {
      hasProcessedFiles: false,
      contentData: {
        Format: '1.3',
        ConfigSchema: null,
        Changes: []
      }
    }
  }

  componentDidMount() {
    console.log('Made with by 🤔 Bouhm')

    // Firefox still doesn't support custom scrollbar css :(
    if (!window.chrome || !window.chrome.webstore)
      console.log('Please use Chrome for optimal 𝒜 𝐸 𝒮 𝒯 𝐻 𝐸 𝒯 𝐼 𝒞 𝒮')
  }

  handleFilesDrop = filesData => {
    let data = this.state.contentData
    _.map(filesData, file => {
      data.Changes.push(DataManager.getDataForFile(file))
    })

    this.setState({ contentData: data, hasProcessedFiles: true })
  }

  renderForm = () => {
    const { contentData } = this.state
    const lineStyle = { borderLeft: 0 }

    return (
      <div>
        <FormField style={lineStyle} field="Format" value="1.3" />
        <Divider
          borderStyle={{ border: 'none' }}
          dividerStyle={{ width: 'calc(100% - 3em)' }}
        />
        {/*<FormField field="ConfigSchema" />*/}
        <FormField style={lineStyle} field="Changes" />
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
