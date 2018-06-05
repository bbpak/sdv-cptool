import React from 'react'
//import { auth, repo } from '../../keys/api'

const withStore = WrappedComponent => {
	class CPToolHOC extends React.Component {
		constructor(props) {
			super(props)
			this.state = {}
		}

		updateContentData = contentData => {
			localStorage.setItem('contentData', JSON.stringify(contentData))
			this.setState({ contentData })
		}

		render() {
			return (
				<WrappedComponent
					contentData={this.state.contentData}
					updateContentData={this.updateContentData}
					{...this.props}
				/>
			)
		}
	}

	return CPToolHOC
}
export default withStore
