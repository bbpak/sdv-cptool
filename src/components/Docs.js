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
      <div className="docs">
        <iframe
          title="docs"
          src="./docs.html"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    )
  }
}
