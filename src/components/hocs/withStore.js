import React from 'react'

const withStore = WrappedComponent => {
  class FormHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        contentData: null
      }
    }

    updateContentData = contentData => {
      this.setState({ contentData })
      console.log(contentData)
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

  return FormHOC
}
export default withStore
