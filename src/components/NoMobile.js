import React from 'react'

export default class NoMobile extends React.Component {
  render() {
    return (
      <div className="no-mobile">
        <p>
          This app doesn't support mobile devices because your fingers are too
          big.
        </p>
      </div>
    )
  }
}
