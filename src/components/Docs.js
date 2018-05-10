import React, { Component } from 'react'

// Literally copied the html of the README from
// Pathoschild's github and displaying it in an iframe
// Tried to fetch it from URL but github was like no
export default class Docs extends Component {
  state = { hidden: true }

  handleLabelClick = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    return (
      <div
        style={this.state.hidden ? { flex: 0 } : { flex: '0 1 50%' }}
        className="docs-container"
      >
        <div className="docs">
          <label onClick={this.handleLabelClick} as="a" color="blue" ribbon>
            Docs
          </label>
          <iframe
            style={
              this.state.hidden ? { display: 'none' } : { display: 'block' }
            }
            title="docs"
            src="./docs.html"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    )
  }
}
