// Data structure of content.json
// Should probably use interface to enforce types
// TODO: Fetch from docs instead of hardcoding
export const contentData = {
  Load: {
    Target: '',
    FromFile: '',
    Optional: {
      LogName: '',
      Enabled: '',
      When: ''
    }
  },
  EditImage: {
    Target: '',
    FromFile: '',
    Optional: {
      FromArea: { X: 0, Y: 0, Width: 16, Height: 16 },
      ToArea: { X: 0, Y: 0, Width: 16, Height: 16 },
      PatchMode: ['Replace', 'Overlay'],
      LogName: '',
      Enabled: '',
      When: ''
    }
  },
  EditData: {
    Target: '',
    Optional: {
      Fields: {},
      Entries: {},
      LogName: '',
      Enabled: '',
      When: ''
    }
  }
}
