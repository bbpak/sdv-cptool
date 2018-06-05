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
import { DOCS_MD_URL, DOCS_BASE_URL, DOCS_REF, getDocsHtml } from './constants'
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
      const headers = {
        headers: {
          Authorization: `token ${auth.TOKEN}`,
          Accept: 'application/vnd.github.v3.raw'
        }
      }
      let newDocsSha
      let newContentSha

      // Check repos for updates
      axios.get(DOCS_REF, headers).then(response => {
        newDocsSha = response.data.object.sha
      })

      axios.get(GAME_REF, headers).then(response => {
        newContentSha = response.data.object.sha
      })

      if (
        !localStorage.getItem('docsSha') ||
        !localStorage.getItem('docsSha') !== newDocsSha
      )
        resolve(this._getDocs(headers))
      if (
        !localStorage.getItem('contentSha') ||
        !localStorage.getItem('contentSha') !== newContentSha
      )
        resolve(this._getGameContentData(newContentSha, headers))
    })
  }

  // Fetch docs from repo
  _getDocs = headers => {
    axios
      .get(DOCS_MD_URL, {
        headers: { Accept: 'application/vnd.github.v3.raw' }
      })
      .then(response => {
        // Html for iframe
        const docsHtml = getDocsHtml(marked(response.data), DOCS_BASE_URL)
        localStorage.setItem('docsHtml', docsHtml)
      })
      .catch(err => {
        console.log(`Unable to fetch docs; ${err.message}`)
      })
  }

  // Fetch content data from repo
  _getGameContentData = (newContentSha, headers) => {
    axios
      .get(`${GAME_CONTENT}/${newContentSha}?recursive=1`, headers)
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
