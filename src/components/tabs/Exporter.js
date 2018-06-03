import React, { Component } from 'react'
import _ from 'lodash'
import FieldBlock from '../form/FieldBlock'
import withStore from '../hocs/withStore'
import '../styles/Forms.css'

class Exporter extends Component {
  handleExportData = () => {
    const data = _.omitBy(
      this.data,
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
    const manifestData = {
      Name: '',
      Author: '',
      Version: '1.0.0',
      Description: '',
      UniqueID: '',
      MinimumApiVersion: '2.0',
      UpdateKeys: [],
      ContentPackFor: {
        UniqueID: 'Pathoschild.ContentPatcher',
        MinimumVersion: '1.3.0'
      }
    }

    return (
      <div className="panel exporter">
        <pre className="header disabled">Manifest</pre>
        <div className="editor manifest-form">
          <FieldBlock
            className="disabled"
            style={{ border: 'none', margin: 0 }}
            blockData={manifestData}
          />
        </div>
        <br />
        <pre className="header disabled">Config</pre>
        <div className="editor config-form">
          <FieldBlock
            className="disabled"
            style={{ border: 'none', margin: 0 }}
            blockData={{}}
          >
            <div
              className="field-block add-button"
              style={{ cursor: 'pointer', border: 'none', margin: 0 }}
              onClick={this.handleAddBlock}
            >
              <i title="new block" className="material-icons add">
                {'add'}
              </i>
            </div>
          </FieldBlock>
        </div>
        <br />
        <span style={{ display: 'flex' }}>
          <div className="button" onClick={this.handleExportData}>
            <i style={{ verticalAlign: 'middle' }} className="material-icons">
              {'get_app'}
            </i>{' '}
            Export content.json
          </div>
          <div className="button disabled">
            <i style={{ verticalAlign: 'middle' }} className="material-icons">
              {'get_app'}
            </i>{' '}
            Export bundle
          </div>
        </span>
      </div>
    )
  }
}

const WrappedComponent = withStore(Exporter)
export default WrappedComponent
