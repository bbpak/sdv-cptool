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
  DOCS_REF,
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
    const headers = {
      headers: {
        Authorization: `token ${auth.TOKEN}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    }

    _.debounce(() => {
      axios.get(DOCS_REF, headers).then(response => {
        this._getDocs(response.data.object.sha)
      })
    }, 15000)

    _.debounce(() => {
      axios.get(GAME_REF, headers).then(response => {
        this._getGameContentData(response.data.object.sha)
      })
    }, 15000)
  }

  // Fetch docs from repo
  _getDocs = () => {
    axios
      .get(DOCS_MD_URL, {
        headers: { Accept: 'application/vnd.github.v3.raw' }
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
  _getGameContentData = (contentSha, headers) => {
    axios
      .get(`${GAME_CONTENT}/${contentSha}?recursive=1`, headers)
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
