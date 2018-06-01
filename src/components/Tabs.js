import React, { Component } from 'react'
import _ from 'lodash'
import './styles/Tabs.css'

export default class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: null
    }
  }

  handleTabClick = i => {
    if (this.state.activeTabIndex == null) this.setState({ activeTabIndex: i })
    else this.setState({ activeTabIndex: null })
  }

  renderTabs = tabs => {
    const { activeTabIndex } = this.state
    return (
      <div className="tabs">
        {this.state.activeTabIndex == null ? (
          _.map(tabs, (tab, i) => {
            return (
              <div
                key={i}
                className="tab"
                onClick={() => this.handleTabClick(i)}
              >
                {tab.label}
              </div>
            )
          })
        ) : (
          <div
            className="tab tab-active"
            onClick={() => this.handleTabClick(activeTabIndex)}
          >
            {tabs[activeTabIndex].label}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { tabs } = this.props
    const { activeTabIndex } = this.state

    return (
      <div
        className="tabs-container"
        style={activeTabIndex == null ? { flex: 0 } : { flex: '0 1 50%' }}
      >
        {this.renderTabs(tabs)}
        <div
          className="tab-content"
          style={
            activeTabIndex == null ? { display: 'none' } : { display: 'block' }
          }
        >
          {activeTabIndex !== null && tabs[activeTabIndex].content}
        </div>
      </div>
    )
  }
}
