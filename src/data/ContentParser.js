import {
  inferredFileTypes,
  getDefaultsForAction,
  validPaths
} from './dataConstants'
import _ from 'lodash'

// Generate content.json data from directory
export const getDataForFile = (file, obj) => {
  const type = _inferTypeFromFileName(file.name)
  const action = _getActionFromFileType(type)
  let filePath = file.fullPath
  filePath = filePath.substr(1)
  let pathParts = filePath.split('/')
  const target = obj.target
    ? obj.target
    : _trimExtension(filePath.replace(`${pathParts[0]}/`, ''))

  let dataForAction = getDefaultsForAction(action, target, filePath)

  return dataForAction
}

export const validContentPath = (
  path,
  contentTrees,
  isLocalFile,
  callback = null,
  fileExt = ''
) => {
  // Infer target path from local path / filename
  if (isLocalFile) {
    let localPath = _trimExtension(path)

    for (let i = 0, len = contentTrees.length; i < len; i++) {
      // Check if parent & name are the same
      let localPaths = localPath.split('/')
      let targetPaths = contentTrees[i].path.split('/')
      if (localPaths.length >= 2 && targetPaths.length >= 2) {
        if (
          localPaths[localPaths.length - 2] ===
            _trimExtension(targetPaths[targetPaths.length - 2]) &&
          localPaths[localPaths.length - 1] ===
            _trimExtension(targetPaths[targetPaths.length - 1])
        ) {
          callback(_trimExtension(contentTrees[i].path))
          return true
        }
      }
      // Guess we'll just match names
      if (
        localPaths[localPaths.length - 1] ===
        _trimExtension(targetPaths[targetPaths.length - 1])
      ) {
        console.log('any luck?')
        callback(_trimExtension(contentTrees[i].path))
        return true
      }
    }
  } else {
    // Much stricter matching for valid target paths
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
  }
  return false
}

const _getActionFromFileType = type => {
  // Tile map
  if (type === 'tbin') return 'Load'
  // Image
  if (type === 'png') return 'EditImage'
  // Probably a packed yaml file
  if (type === 'xnb') return 'EditData'
  else return 'EditImage'
}

const _inferTypeFromFileName = fileName => {
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
}

const _trimExtension = path => {
  let trimmedStr = path
  let fullPath = path
  let ext = fullPath.split('.').pop()
  trimmedStr = trimmedStr.substring(0, trimmedStr.indexOf(`.${ext}`))
  return trimmedStr
}
