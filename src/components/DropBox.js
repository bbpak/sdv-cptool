import React, { Component } from 'react'
import Loader from './misc/Loader'
import { validFileTypes } from '../data/dataConstants'
import _ from 'lodash'

export default class DropBox extends Component {
  constructor() {
    super()
    this.state = { isLoading: false }
    this.filesData = []
  }

  handleFileUpload = () => {
    const fileSelector = document.getElementById('upload')
    fileSelector.setAttribute('webkitdirectory', 'webkitdirectory')
    fileSelector.setAttribute('directory', 'directory')
    fileSelector.click()
  }

  // https://stackoverflow.com/questions/18815197/javascript-file-dropping-and-reading-directories-asynchronous-recursion
  traverseDirectory = entry => {
    const reader = entry.createReader()
    // Resolved when the entire directory is traversed
    return new Promise((resolve, reject) => {
      const iterationAttempts = []
      let readEntries = () => {
        // According to the FileSystem API spec, readEntries() must be called until
        reader.readEntries(
          entries => {
            if (!entries.length) {
              // Done iterating this particular directory
              resolve(Promise.all(iterationAttempts))
            } else {
              // Add a list of promises for each directory entry.  If the entry is itself
              // a directory, then that promise won't resolve until it is fully traversed.
              iterationAttempts.push(
                Promise.all(
                  _.map(entries, iEntry => {
                    if (iEntry.isFile) {
                      if (validFileTypes.includes(iEntry.name.split('.').pop()))
                        this.filesData.push(iEntry)

                      return
                    }

                    return this.traverseDirectory(iEntry)
                  })
                )
              )
              // Try calling readEntries() again for the same dir, according to spec
              readEntries()
            }
          },
          error => reject(error)
        )
      }
      readEntries()
    })
  }

  removeDragData = e => {
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      e.dataTransfer.items.clear()
    } else {
      // Use DataTransfer interface to remove the drag data
      e.dataTransfer.clearData()
    }
  }

  handleDragOver = e => {
    e.preventDefault()

    let dropbox = document.querySelector('.drop-outline')
    dropbox.classList.add('drop-outline-dragover')
  }

  handleDragLeave = e => {
    e.preventDefault()

    let dropbox = document.querySelector('.drop-outline')
    dropbox.classList.remove('drop-outline-dragover')
  }

  handleFileDrop = e => {
    e.preventDefault()
    if (!e.dataTransfer) return

    const data = e.dataTransfer.items

    if (
      !data[0].webkitGetAsEntry() ||
      !data[0].webkitGetAsEntry().isDirectory
    ) {
      alert('You must drop a single folder.')
      return
    }

    this.setState({ isLoading: true })
    const entry = data[0].webkitGetAsEntry()

    this.traverseDirectory(entry).then(() => {
      this.setState({ isLoading: false })
      this.props.onDrop(this.filesData)
    })

    // Pass event to removeDragData for cleanup
    this.removeDragData(e)
  }

  handleHideDropbox = () => {
    this.props.onDrop({})
  }

  render() {
    const { isHidden } = this.props
    const { isLoading } = this.state

    return (
      <div className="dropbox">
        {!isHidden && (
          <i
            title="close dropbox"
            style={{
              position: 'absolute',
              top: '0.25em',
              right: '0.25em',
              cursor: 'pointer'
            }}
            className="material-icons remove"
            onClick={this.handleHideDropbox}
          >
            {'cancel'}
          </i>
        )}
        <div
          className="drop-outline"
          style={
            isHidden
              ? { border: 'none', background: 'none', cursor: 'default' }
              : {}
          }
          /*
          onClick={() => {
            !isHidden && this.handleFileUpload()
          }}
          */
          onDrop={this.handleFileDrop}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
        >
          {isLoading && (
            <Loader
              messages={[
                'Scanning files...',
                'Dispatching junimos...',
                'Loading editor...'
              ]}
            />
          )}
          {/*
          !isHidden && <input
          id="upload"
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleFileDrop}
          onClick={this.handleFileUpload}
          multiple
        />
        */}
        </div>
      </div>
    )
  }
}
