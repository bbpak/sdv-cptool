import React, { Component } from 'react'
import _ from 'lodash'
import './styles/Sidebar.css'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePanelIndex: null
    }
  }

  handleTabClick = i => {
    if (this.state.activePanelIndex == null) this.setState({ activePanelIndex: i })
    else this.setState({ activePanelIndex: null })
  }

  renderpanels = panels => {
    const { activePanelIndex } = this.state
    return (
      <div>
        {this.state.activePanelIndex == null ? (
          _.map(panels, (panel, i) => {
            return (
              <div
                key={i}
                className="tab"
                onClick={() => this.handleTabClick(i)}
              >
                {panel.label}
              </div>
            )
          })
        ) : (
          <div
            className="tab tab-active"
            onClick={() => this.handleTabClick(activePanelIndex)}
          >
            {panels[activePanelIndex].label}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { panels } = this.props
    const { activePanelIndex } = this.state

    return (
      <div
        className="sidebar-container"
        style={activePanelIndex == null ? { flex: 0 } : { flex: '0 1 50%' }}
      >
        {this.renderpanels(panels)}
        <div
          style={
            activePanelIndex == null ? { display: 'none' } : { display: 'block' }
          }
        >
          {activePanelIndex !== null && panels[activePanelIndex].content}
        </div>
      </div>
    )
  }
}
