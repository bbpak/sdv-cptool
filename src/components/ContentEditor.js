import React, { Component } from 'react'
import _ from 'lodash'
import Divider from './misc/Divider'
import DropBox from './DropBox'
import FormBlock from './form/FormBlock'
import FormField from './form/FormField'
import DataConverter from '../data/DataConverter'
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
    console.log('Made with by 🤔 Bouhm')

    // Firefox still doesn't support custom scrollbar css :(
    if (!window.chrome || !window.chrome.webstore)
      console.log('Please use Chrome for optimal 𝒜 𝐸 𝒮 𝒯 𝐻 𝐸 𝒯 𝐼 𝒞 𝒮')
  }

  handleFilesDrop = filesData => {
    let data = defaultData
    _.map(filesData, file => {
      data.Changes.push(DataConverter.getDataForFile(file))
    })
    this.props.updateContentData(data)
    this.setState({ hasProcessedFiles: true })
  }

  // Block representing each object in Changes
  handleBlockDataChange = (blockData, i) => {
    const { contentData, updateContentData } = this.props
    let newData = contentData
    newData.Changes[i] = blockData
    updateContentData(newData)
  }

  exportData = () => {
    const data = _.omitBy(this.props.contentData, _.isNull);

    var file = new Blob([JSON.stringify(data, null, "\t")], {type: 'text'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'content.json');
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'content.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }

  renderForm = () => {
    const { contentData } = this.props
    const lineStyle = { borderLeft: 0 }

    return (
      <div>
        <div style={{position: 'absolute', top: 0, right: 0}} onClick={this.exportData}>Debug Export</div>
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
              <FormBlock index={i} blockData={blockData} handleBlockDataChange={this.handleBlockDataChange} />
              <Divider 
                dividerStyle={{ left: '1em', width: 'calc(100% - 5em)' }} 
              />
            </div>
          )
        })}
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
