import React, { Component } from 'react'
import _ from 'lodash'
import FieldBlock from '../form/FieldBlock'
import { defaultManifest } from '../../data/dataConstants'
import '../styles/Forms.css'

export default class Exporter extends Component {
  handleExportData = () => {
    const data = _.omitBy(this.props.contentData, _.isNil || _.isEmpty)
    let bruh = this._fixJson(data)

    var file = new Blob([JSON.stringify(bruh, null, 2)], {
      type: 'text'
    })
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

  _fixJson = data => {
    let obj = data
    // Parse numbers
    _.map(obj.Changes, fields => {
      if (fields.FromArea) {
        _.map(fields.FromArea, (value, key) => {
          if (value) fields.FromArea[key] = parseInt(value)
          else fields.FromArea[key] = 0
        })
      }
      if (fields.ToArea) {
        _.map(fields.ToArea, (value, key) => {
          if (value) fields.ToArea[key] = parseInt(value)
          else fields.ToArea[key] = 0
        })
      }
    })

    // Parse boolean
    _.map(obj.Changes, fields => {
      if (fields.Enabled) fields.Enabled = fields.Enabled === 'true'
    })

    return obj
  }

  render() {
    return (
      <div className="panel exporter">
        <pre className="header disabled">Manifest</pre>
        <div className="editor manifest-form">
          <FieldBlock
            className="disabled"
            style={{ border: 'none', margin: 0 }}
            blockData={defaultManifest}
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
