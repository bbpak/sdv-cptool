import React from 'react'
//import { auth, repo } from '../../keys/api'

const withStore = WrappedComponent => {
  class CPToolHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentDidMount() {
      console.log('sup')
    }

    updateContentData = contentData => {
      this.setState({ contentData })
    }

    render() {
      console.log(this.state.contentData)
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
