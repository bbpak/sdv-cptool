import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'
import marked from 'marked'

import ContentEditor from './components/ContentEditor'
import Sidebar from './components/Sidebar'
import Docs from './components/tabs/Docs'
import Templates from './components/tabs/Templates'
import Exporter from './components/tabs/Exporter'
import Image from './components/tabs/Image'
import About from './components/tabs/About'
import { DOCS_MD_URL, DOCS_BASE_URL, DOCS_REF } from './constants'
import { auth, GAME_CONTENT, GAME_REF } from './keys/api'
import './App.css'

class App extends Component {
	constructor() {
		super()
		this.state = { docsHtml: null, gameContentData: null }
	}

	componentDidMount() {
		this._getUpdates()
			.then(() => {
				const { docsHtml, gameContentData } = localStorage
				this.setState({
					docsHtml,
					gameContentData: JSON.parse(gameContentData)
				})
			})
			.catch(err => {
				console.log(
					`Unable to fetch updates for Docs & Game Content; ${err.message}`
				)
			})
	}

	_getUpdates = () => {
		return new Promise((resolve, reject) => {
			let docsSha
			let contentSha
			const headers = {
				headers: {
					Authorization: `token ${auth.TOKEN}`,
					Accept: 'application/vnd.github.v3.raw'
				}
			}

			// Check repos for updates
			axios.get(DOCS_REF, headers).then(response => {
				localStorage.setItem('docsSha', response.data.object.sha)
			})

			axios.get(GAME_REF, headers).then(response => {
				localStorage.setItem('contentSha', response.data.object.sha)
			})

			if (
				!localStorage.getItem('docsSha') ||
				!localStorage.getItem('docsSha') !== docsSha
			)
				resolve(this._getDocs())
			if (
				!localStorage.getItem('contentSha') ||
				!localStorage.getItem('contentSha') !== contentSha
			)
				resolve(this._getGameContentData())
		})
	}

	// Fetch content data from repo
	_getGameContentData = () => {
		const headers = {
			headers: {
				Authorization: `token ${auth.TOKEN}`,
				Accept: 'application/vnd.github.v3.raw'
			}
		}

		axios
			.get(GAME_REF, headers)
			.then(response => {
				const docsSha = response.data.object.sha
				localStorage.setItem('docsSha', docsSha)
				return axios.get(`${GAME_CONTENT}/${docsSha}?recursive=1`, headers)
			})
			.then(response => {
				const gameContentData = _.filter(response.data.tree, o => {
					return _.startsWith(o.path, 'Content/')
				})
				localStorage.setItem('gameContentData', JSON.stringify(gameContentData))
			})
			.catch(err => {
				console.log(`Unable to fetch game content; ${err.message}`)
			})
	}

	// Fetch docs from repo
	_getDocs = () => {
		axios
			.get(DOCS_MD_URL, {
				headers: { Accept: 'application/vnd.github.v3.raw' }
			})
			.then(response => {
				const docsHtml = `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <link rel="stylesheet" type="text/css" href="./github-md.css"></link>
            </head>
            <body>
              <article class="markdown-body entry-content" itemprop="text">
                ${marked(response.data)}
                <small>
                  Sourced from <a href=${DOCS_BASE_URL} target="_blank" >${DOCS_BASE_URL}</a>
                </small>
              </article>
            </body>
            </html>
          `
				localStorage.setItem('docsHtml', docsHtml)
			})
			.catch(err => {
				console.log(`Unable to fetch docs; ${err.message}`)
			})
	}

	render() {
		const { docsHtml, gameContentData } = this.state

		const tabs = [
			{
				label: 'Docs',
				content: <Docs html={docsHtml} />,
				disable: !docsHtml
			},
			{
				label: 'Templates',
				content: <Templates />,
				disabled: !gameContentData || true
			},
			{
				label: 'Image',
				content: <Image />,
				disabled: !gameContentData || true
			},
			{
				label: 'Export',
				content: <Exporter />
			},
			{
				label: 'About',
				content: <About />
			}
		]

		return (
			<div className="app">
				<ContentEditor />
				<Sidebar tabs={tabs} />
			</div>
		)
	}
}

export default App
