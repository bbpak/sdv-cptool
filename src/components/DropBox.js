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

  componentWillUnmount() {}

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
    if (data.length > 1) {
      alert('You must drop a single folder.')
      return
    }

    let hasLoaded
    this.setState({ isLoading: !hasLoaded })
    const entry = data[0].webkitGetAsEntry()

    this.traverseDirectory(entry).then(() => {
      hasLoaded = true
      this.props.onDrop(this.filesData)
    })

    this.setState({ isLoading: !hasLoaded })
    // Pass event to removeDragData for cleanup
    this.removeDragData(e)
  }

  render() {
    return (
      <div
        className="dropbox drop-outline"
        onClick={this.handleFileUpload}
        onDrop={this.handleFileDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
      >
        {this.state.isLoading && <Loader />}
        <input
          id="upload"
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleFileDrop}
          onClick={this.handleFileUpload}
          multiple
        />
      </div>
    )
  }
}
