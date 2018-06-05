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
import {
  DOCS_MD_URL,
  DOCS_BASE_URL,
  getDocsHtml,
  GAME_CONTENT,
  GAME_REF
} from './constants'
import { auth } from './keys/api'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = { docsHtml: null, gameContentData: null }
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `token ${auth.PAT}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    }

    this._getDocs()
    axios.get(GAME_REF, config).then(response => {
      this._getGameContentData(response.data.object.sha, config)
    })
  }

  // Fetch docs from repo
  _getDocs = () => {
    axios
      .get(DOCS_MD_URL, {
        Accept: 'application/vnd.github.v3.raw'
      })
      .then(response => {
        // Html for iframe
        const docsHtml = getDocsHtml(marked(response.data), DOCS_BASE_URL)
        this.setState({ docsHtml })
      })
      .catch(err => {
        console.log(`Unable to fetch docs; ${err.message}`)
      })
  }

  // Fetch content files data from repo
  _getGameContentData = (contentSha, config) => {
    axios
      .get(`${GAME_CONTENT}/${contentSha}?recursive=1`, config)
      .then(response => {
        const gameContentData = _.filter(response.data.tree, o => {
          return _.startsWith(o.path, 'Content/')
        })
        this.setState({ gameContentData })
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
