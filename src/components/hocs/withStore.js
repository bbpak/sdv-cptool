import React from 'react'
import _ from 'lodash'

const withStore = WrappedComponent => {
  class FormHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        contentData: null
      }
    }

    handleBlockDataChange = (field, data) => {
      let newData = this.state.blockData
      newData[field] = data
      this.setState({ contentData: newData })
    }

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

  return FormHOC
}
export default withStore
