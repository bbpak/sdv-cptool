import React, { Component } from 'react'
import withStore from '../hocs/withStore'

class Image extends Component {
  render() {
    return <div />
  }
}

const WrappedComponent = withStore(Image)
export default WrappedComponent
