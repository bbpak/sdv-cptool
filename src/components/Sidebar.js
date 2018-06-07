import React, { Component } from 'react'
import _ from 'lodash'
import './styles/Sidebar.css'

export default class Sidebar extends Component {
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
      <div>
        {this.state.activeTabIndex == null ? (
          _.map(tabs, (tab, i) => {
            return (
              <div
                key={i}
                className={`tab ${tab.disabled && 'disabled'}`}
                onClick={() => {
                  !tab.disabled && this.handleTabClick(i)
                }}
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
            {activeTabIndex !== null && (
              <i
                style={{ verticalAlign: 'middle', float: 'right' }}
                className="material-icons"
              >
                {'reply'}
              </i>
            )}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { tabs } = this.props
    const { activeTabIndex } = this.state
    const fullSpan = window.matchMedia('(max-device-width: 1024px)').matches

    return (
      <div
        className="sidebar-container"
        style={
          activeTabIndex == null
            ? { flex: 0 }
            : fullSpan
              ? { flex: '1 1 auto' }
              : { flex: '0 1 50%' }
        }
      >
        {this.renderTabs(tabs)}
        {activeTabIndex !== null && tabs[activeTabIndex].content}
      </div>
    )
  }
}
