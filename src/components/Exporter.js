import React, { Component } from 'react'
import _ from 'lodash'
import FormBlock from './form/FormBlock'
import FormField from './form/FormField'
import withStore from './hocs/withStore'
import './styles/Forms.css'

class Exporter extends Component {
  handleExportData = () => {
    const data = _.omitBy(
      this.props.contentData,
      _.isNull || _.isUndefined || _.isEmpty
    )

    var file = new Blob([JSON.stringify(data, null, '\t')], { type: 'text' })
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, 'content.json')
    else {
      // Others
      var a = document.createElement('a'),
        url = URL.createObjectURL(file)
      a.href = url
      a.download = 'content.json'
      document.body.appendChild(a)
      a.click()
      setTimeout(function() {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 0)
    }
  }

  render() {
    const left = Math.floor(Math.random() * 101)
    const top = Math.floor(Math.random() * 101)
    const manifestData = {
      "Name": "",
      "Author": "",
      "Version": "1.0.0",
      "Description": "",
      "UniqueID": "",
      "MinimumApiVersion": "2.0",
      "UpdateKeys": [],
      "ContentPackFor": {
         "UniqueID": "Pathoschild.ContentPatcher", 
         "MinimumVersion": "1.3.0" 
      }
    }

    return (
      <div className="exporter">
        <div className="manifest-form">
          <pre className="header">Manifest</pre>
          <FormBlock
            className="manifest"
            blockData={manifestData}
            handleBlockDataChange={this.handleBlockDataChange}
          />
        </div>
        <div className="button" onClick={this.handleExportData}>
          Export content.json
        </div>
      </div>
    )
  }
}

const WrappedComponent = withStore(Exporter)
export default WrappedComponent
