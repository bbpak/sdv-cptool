import React from 'react'
import { fileTypeData } from './contentData'
import _ from 'lodash'

const DataConverter = props => {
  const _getActionFromType = type => {
    // Tile map
    if (type === 'tbin') return 'Load'
    // Image
    if (type === 'png') return 'EditImage'
    // Probably a packed yaml file
    if (type === 'xnb') return 'EditData'
    else return 'EditImage'
  }

  const _inferTypeFromFileName = fileName => {
    let fileParts = fileName.split('.')
    let type = fileParts.pop()
    let name = fileParts.pop()

    if (type !== 'xnb') return type

    // Handle specific cases
    if (!isNaN(name)) type = 'tbin'
    else {
      _.map(_.keys(fileTypeData.files), nameStr => {
        if (name.toLowerCase().includes(nameStr)) {
          type = fileTypeData.files[nameStr]
          return
        }
      })
    }
    // Infer based on matching parent folder
    if (!type) type = _.get(fileTypeData.directories, parent)

    return type
  }

  const getDataForFile = file => {
    const type = _inferTypeFromName(file.name)
    const action = _getActionFromType(type)
  }

  const generateExportData = formData => {}
}
