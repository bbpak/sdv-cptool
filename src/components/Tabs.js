import React, {Component} from 'react';
import Docs from './Docs'
import _ from 'lodash'

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: null
    }
  }

  handleTabClick = i => {
    this.setState({activeTabIndex: i})
  }

  renderTabs = (tabs) => {
    return (
      <div className="tabs">
        {_.map(tabs, (tab, i) => {
          return (
            <div 
              key={i} 
              className="tab"
              onClick={() => this.handleTabClick(i)}
            >
              {tab.label}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { tabs } = this.props
    const { activeTabIndex } = this.state

    return (
      <div className="tabs-container">
        {this.renderTabs(tabs)}
        <div 
          className="tab-content"
          style={activeTabIndex == null ? { flex: 0 } : { flex: '0 1 50%' }}
        >
          {activeTabIndex !== null && tabs[activeTabIndex].content}
        </div>
      </div>
    )
  }
}
