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

export const validFileTypes = ['xnb', 'tbin', 'png']

export const gameContentData = {}
