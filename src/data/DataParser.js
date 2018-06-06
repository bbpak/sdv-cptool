import {
  inferredFileTypes,
  getDefaultsForAction,
  validPaths
} from './dataConstants'
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

    let dataForAction = getDefaultsForAction(action, target, filePath)

    return dataForAction
  },

  isValidContentPath(path, contentTrees, fileExt, callback = null) {
    let hasValidPath = false

    for (let i = 0; i < validPaths.length; i++) {
      if (_.startsWith(path, 'Content/' + validPaths[i])) {
        hasValidPath = true
        break
      }
    }

    if (!hasValidPath) return false

    // Iterate the content tree now...
    for (let i = 0, len = contentTrees.length; i < len; i++) {
      if (path === _.replace(contentTrees[i].path, fileExt, '')) {
        callback && callback(contentTrees[i].path)
        return true
      }
    }
    return false
  }
}

export default DataParser
