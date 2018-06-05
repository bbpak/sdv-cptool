import React from 'react'
import _ from 'lodash'

const withStore = WrappedComponent => {
  class CPToolHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    updateContentData = contentData => {
      _.debounce(
        () => localStorage.setItem('contentData', JSON.stringify(contentData)),
        15000
      )
      this.setState({ contentData })
    }

    render() {
      return (
        <WrappedComponent
          contentData={this.state.contentData}
          updateContentData={this.updateContentData}
          {...this.props}
        />
      )
    }
  }

  return CPToolHOC
}
export default withStore
