import React from 'react'

const defaultContentData = {
  Format: '',
  ConfigSchema: {},
  Changes: []
}
export const ContentDataContext = React.createContext({
  contentData: defaultContentData,
  updateContentData: () => {}
})
