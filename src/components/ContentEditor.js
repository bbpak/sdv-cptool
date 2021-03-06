import React, { Component } from 'react'
import _ from 'lodash'
import Divider from './misc/Divider'
import DropBox from './DropBox'
import FormBlock from './form/FormBlock'
import FieldBlock from './form/FieldBlock'
import FormField from './form/FormField'
import { getDataForFile, validContentPath } from '../data/contentParser'
import { defaultData, getDefaultsForAction } from '../data/dataConstants'
import { ContentDataContext } from '../data/DataContext'
import './styles/Editor.css'

export default class ContentEditor extends Component {
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

    document.addEventListener('keydown', this.handleKeyPress)
    /*
    if (localStorage.contentData) {
      this.setState({ hasProcessedFiles: true })
      this.props.updateContentData(localStorage.contentData)
    }
    */
  }

  handleKeyPress = event => {
    switch (event.keyCode) {
      case 27:
        this.handleFilesDrop({})
        document.removeEventListener('keydown', this.handleKeyPress)
        break
      default:
        break
    }
  }

  handleFilesDrop = filesData => {
    const { contentData, updateContentData, contentTrees } = this.props
    let data = contentData ? contentData : defaultData

    _.map(filesData, file => {
      let target
      validContentPath(file.fullPath, contentTrees, true, targetPath => {
        target = targetPath
      })
      data.Changes.push(getDataForFile(file, { target }))
    })

    updateContentData(data)
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
    const newBlock = getDefaultsForAction('EditImage')

    newData.Changes.push(newBlock)
    updateContentData(newData)
  }

  renderForm = () => {
    const { contentData } = this.props
    const lineStyle = { borderLeft: 0 }

    const data = contentData ? contentData : defaultData

    return (
      <div>
        <FormBlock>
          <FormField style={lineStyle} field="Format" value="1.3" />
        </FormBlock>
        <Divider
          borderStyle={{ border: 'none' }}
          dividerStyle={{ width: 'calc(100% - 3em)' }}
        />
        <FormBlock>
          <FormField style={lineStyle} field="Changes" />

          {_.map(data.Changes, (blockData, i) => {
            return (
              <div key={i}>
                <ContentDataContext.Consumer>
                  {context => (
                    <FieldBlock
                      isCollapsible
                      index={i}
                      contentTrees={context.contentTrees}
                      getFocusedField={context.getFocusedField}
                      blockData={blockData}
                      handleBlockDataChange={this.handleBlockDataChange}
                    />
                  )}
                </ContentDataContext.Consumer>
                <Divider dividerStyle={{ width: 'calc(100% - 4em)' }} />
              </div>
            )
          })}
          <div
            className="field-block add-button"
            style={{ cursor: 'pointer' }}
            onClick={this.handleAddBlock}
          >
            <i title="new block" className="material-icons add">
              {'add'}&emsp;&emsp;
            </i>
          </div>
        </FormBlock>
      </div>
    )
  }

  render() {
    const { hasProcessedFiles } = this.state
    const isTablet = /Mobi|Android/i.test(navigator.userAgent)

    return (
      <div className="editor">
        <div className="content-form">
          <DropBox
            onDrop={this.handleFilesDrop}
            isHidden={hasProcessedFiles || isTablet}
          />
          {(hasProcessedFiles || isTablet) && this.renderForm()}
        </div>
      </div>
    )
  }
}
