import React, { Component } from 'react'
import _ from 'lodash'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleMenuClose = () => {
    this.setState({ isOpen: false })
  }

  handleOptionSelect = e => {
    this.props.handleOptionSelect(e.currentTarget.textContent)
  }

  render() {
    const { options, icon, className } = this.props
    const { isOpen } = this.state

    return (
      <div className="dropdown">
        <div onClick={this.handleToggleOpen} onBlur={this.handleMenuClose}>
          <i
            className={`material-icons ${className}`}
            onClick={this.handleOpenOptions}
          >
            {icon}
          </i>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            {_.map(options, (option, i) => {
              return (
                <div
                  className="menu-option"
                  tabIndex="0"
                  onClick={this.handleOptionSelect}
                >
                  {option}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
