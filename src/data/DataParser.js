import { inferredFileTypes } from './dataConstants'
import _ from 'lodash'

const DataParser = {
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
  
  // Generate content.json data from directory
  getDataForFile(file) {
    const type = this._inferTypeFromFileName(file.name)
    const action = this._getActionFromFileType(type)
    let filePath = file.fullPath
    filePath = filePath.substr(1)
    let pathParts = filePath.split('/')
    const target = filePath.replace(`${pathParts[0]}/`, '')

    // Start with common fields
    let dataForAction = {
      Action: action,
      Target: target,
    }

    switch (action) {
      case 'Load':
        _.assign(dataForAction, {
          FromFile: filePath
        })
        break
      case 'EditImage':
        _.assign(dataForAction, {
          FromFile: filePath,
          FromArea: {"X":null,"Y":null,"Width":null,"Height":null},
          ToArea: {"X":null,"Y":null,"Width":null,"Height":null},
          PatchMode: null
        })
        break
      case 'EditData':
        _.assign(dataForAction, {
          Fields: null,
          Entries: {}
        })
        break
      default:
        break
    }

    dataForAction = { ...dataForAction, ...{When: null, LogName: null, Enabled: null, }}

    return dataForAction
  }
}

export default DataParser
