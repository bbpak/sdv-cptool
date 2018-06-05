import _ from 'lodash'

// TODO: Parse most of this from the repo instead of hardcoding

// Guess the filetype when .xnb files are provided
// Old .xnb mods will most likely provide a 'Content'
// root directory matching filepaths of the vanilla content
export const inferredFileTypes = {
  // Assume filetypes based on names
  files: {
    tiles: 'png',
    sheet: 'png',
    forestevent: 'tbin',
    guspicnic: 'tbin',
    marniebarn: 'tbin',
    meetingroom: 'tbin',
    meetingroom2: 'tbin',
    nicetrailer: 'tbin',
    tent2: 'tbin',
    willyroom: 'tbin',
    zuzuinn: 'tbin'
  },
  // Assume filetype based on parent directories
  directories: {
    animals: 'png',
    beforePathfinding: 'png',
    building: 'png',
    characters: 'png',
    data: 'data',
    dialogue: 'data',
    events: 'data',
    farmer: 'png',
    festivals: 'data',
    fonts: 'png',
    lighting: 'png',
    loosesprites: 'png',
    monsters: 'png',
    portraits: 'png',
    maps: 'tbin',
    mines: 'tbin',
    minigames: 'png',
    schedules: 'data',
    strings: 'data',
    terrainfeatures: 'png',
    tilesheets: 'png',
    tv: 'data'
  }
}

export const getDefaultsForAction = (action, target = '', fromFile = '') => {
  // Common fields
  let dataForAction = {
    Action: action,
    Target: target
  }

  // Action-specific fields
  switch (action) {
    case 'Load':
      _.assign(dataForAction, {
        FromFile: fromFile
      })
      break
    case 'EditImage':
      _.assign(dataForAction, {
        FromFile: fromFile,
        FromArea: {
          X: '',
          Y: '',
          Width: '',
          Height: ''
        },
        ToArea: {
          X: '',
          Y: '',
          Width: '',
          Height: ''
        },
        PatchMode: ''
      })
      break
    case 'EditData':
      _.assign(dataForAction, {
        Fields: '',
        Entries: ''
      })
      break
    default:
      break
  }

  // Common optional fields
  dataForAction = {
    ...dataForAction,
    ...{ When: '', LogName: '', Enabled: '' }
  }

  return dataForAction
}

export const validFileTypes = ['xnb', 'tbin', 'png']

export const defaultData = { Format: '1.3', ConfigSchema: null, Changes: [] }

export const optionalFields = [
  'FromArea',
  'ToArea',
  'PatchMode',
  'When',
  'LogName',
  'Enabled',
  'Fields',
  'Entries'
]

export const defaultManifest = {
  Name: '',
  Author: '',
  Version: '1.0.0',
  Description: '',
  UniqueID: '',
  MinimumApiVersion: '2.0',
  UpdateKeys: [],
  ContentPackFor: {
    UniqueID: 'Pathoschild.ContentPatcher',
    MinimumVersion: '1.3.0'
  }
}
