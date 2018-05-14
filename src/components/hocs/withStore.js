import React from 'react'
import _ from 'lodash'

const withStore = WrappedComponent => {
  class FormHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        blockData: {}
      }
    }

    componentDidMount() {
      console.log(this)
      const { field, value } = this.props
      this.handleDataChange(field, value)
    }

    handleDataChange = (field, data) => {
      let newData = this.state.blockData
      newData[field] = data
      this.setState({ blockData: newData })
    }

    getDataForField = field => {
      return this.state.blockData[field]
    }

    render() {
      return (
        <WrappedComponent
          handleDataChange={this.handleDataChange}
          getDataForField={this.getDataForField}
          {...this.props}
        />
      )
    }
  }

  return FormHOC
}
export default withStore
