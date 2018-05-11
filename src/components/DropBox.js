import React, { Component } from 'react'
import _ from 'lodash'

export default class DropBox extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  // I took this from stackoverflow
  traverseDirectory = (entry) => {
    const reader = entry.createReader();
    // Resolved when the entire directory is traversed
    return new Promise((resolve, reject) => {
      const iterationAttempts = [];
      let readEntries = () => {
        // According to the FileSystem API spec, readEntries() must be called until
        reader.readEntries((entries) => {
          if (!entries.length) {
            // Done iterating this particular directory
            resolve(Promise.all(iterationAttempts));
          } else {
            // Add a list of promises for each directory entry.  If the entry is itself
            // a directory, then that promise won't resolve until it is fully traversed.
            iterationAttempts.push(Promise.all(_.map(entries, iEntry => {
                if (iEntry.isFile)
                  return iEntry;   

                return this.traverseDirectory(iEntry)
              })
            ));
            // Try calling readEntries() again for the same dir, according to spec
            readEntries();
          }
        }, error => reject(error));
      }
      readEntries();
    });
  }

  removeDragData = (e) => {
    console.log('Removing drag data')

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      e.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      e.dataTransfer.clearData();
    }
  }

  handleDragOver = (e) => {
    e.preventDefault();

    var outline = document.getElementsById("drop-outline")
    if (outline)
      outline.classList.add('drop-outline-dragover')
  }

  handleFileDrop = (e) => {
    e.preventDefault()

    const data = e.dataTransfer.items;
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      const entry = item.webkitGetAsEntry();
      this.traverseDirectory(entry)
        .then(result => {
          this.props.onDrop(result)
        });
    }

    // Pass event to removeDragData for cleanup
    this.removeDragData(e)
  }

  render() {
    return (
      <div id="dropbox" className={`dropbox ${!this.state.data && 'drop-outline'}`} onDrop={this.handleFileDrop} onDragOver={this.handleDragOver}>
        <div className="drop-upload" />
      </div>
    )
  }
}
