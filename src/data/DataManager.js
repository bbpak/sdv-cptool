import { inferredFileTypes } from './dataConstants'
import _ from 'lodash'

const DataManager = {
  _getActionFromFileType(type) {
    // Tile map
    if (type === 'tbin') return 'Load'
    // Image
    if (type === 'png') return 'EditImage'
    // Probably a packed yaml file
    if (type === 'xnb') return 'EditData'
    else return 'EditImage'
  },

  _inferTypeFromFileName(fileName) {
    let dirParts = fileName.split('/')
    let fileParts = dirParts.pop().split('.')
    let type = fileParts.pop()
    const parent = dirParts.pop()
    const name = fileParts.pop()

    if (type !== 'xnb') return type

    // Handle specific cases
    if (!isNaN(name)) type = 'tbin'
    else {
      _.map(_.keys(inferredFileTypes.files), nameStr => {
        if (name.toLowerCase().includes(nameStr)) {
          type = inferredFileTypes.files[nameStr]
          return
        }
      })
    }
    // Infer based on matching parent folder
    if (!type) type = _.get(inferredFileTypes.directories, parent)

    return type
  },

  getDataForFile(file) {
    const type = this._inferTypeFromFileName(file.name)
    const action = this._getActionFromFileType(type)

    // Start with common fields
    let dataForAction = {
      Action: action,
      Target: file.fullPath,
      LogName: null,
      Enabled: null,
      When: null
    }

    switch (action) {
      case 'Load':
        _.assign(dataForAction, {
          FromFile: file.fullPath
        })
        break
      case 'EditImage':
        _.assign(dataForAction, {
          FromFile: file.fullPath,
          FromArea: null,
          ToArea: null,
          PatchMode: null
        })
        break
      case 'EditData':
        _.assign(dataForAction, {
          Fields: null,
          Entries: null
        })
        break
      default:
        break
    }

    return dataForAction
  },

  // http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
  toReadableFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024
    if (bytes < thresh) return bytes + ' B'
    var units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    var u = -1
    do {
      bytes /= thresh
      ++u
    } while (bytes >= thresh)
    return bytes.toFixed(1) + ' ' + units[u]
  }
}

export default DataManager
