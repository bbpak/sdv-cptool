import _ from 'lodash'

// Hardcoded stuff because
// 1. Dictionary look-ups are fast
// 2. Content is unlikely to change

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

export const getDefaultsForAction = (
  action,
  target = undefined,
  fromFile = undefined
) => {
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
          X: undefined,
          Y: undefined,
          Width: undefined,
          Height: undefined
        },
        ToArea: {
          X: undefined,
          Y: undefined,
          Width: undefined,
          Height: undefined
        },
        PatchMode: undefined
      })
      break
    case 'EditData':
      _.assign(dataForAction, {
        Fields: undefined,
        Entries: undefined
      })
      break
    default:
      break
  }

  // Common optional fields
  dataForAction = {
    ...dataForAction,
    ...{ When: undefined, LogName: undefined, Enabled: undefined }
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
  'When',
  'Fields',
  'Entries'
]
