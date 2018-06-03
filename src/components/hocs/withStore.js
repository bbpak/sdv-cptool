import React from 'react'
//import { auth, repo } from '../../keys/api'

const withStore = WrappedComponent => {
  class CPToolHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        manifestData: null,
        configData: null,
        contentData: null,
        contentFiles: null
      }
    }

    componentDidMount() {}

    updateContentData = contentData => {
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
