import React from 'react'

class FormBlock extends React.Component {
  render() {
    return <div className="form-block">{this.props.children}</div>
  }
}
export default FormBlock
