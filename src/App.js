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
import { ContentDataContext } from './data/DataContext'

import {
  DOCS_MD_URL,
  DOCS_BASE_URL,
  getDocsHtml,
  GAME_CONTENT,
  GAME_REF
} from './static/constants'
import { auth } from './keys/api'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.updateContentData = contentData => {
      this.setState({ contentData })
    }

    this.state = {
      docsHtml: null,
      gameFilesData: null,
      contentData: null,
      updateContentData: this.updateContentData
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `token ${auth.PAT}`,
        Accept: 'application/vnd.github.v3+raw'
      }
    }

    this._getDocs()
    axios.get(GAME_REF, config).then(response => {
      this._getGameFilesData(response.data.object.sha, config)
    })
  }

  _updateGists = () => {}

  // Fetch docs from gist
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

  // Fetch content files data from gist
  _getGameFilesData = (contentSha, config) => {
    axios
      .get(`${GAME_CONTENT}/${contentSha}?recursive=1`, config)
      .then(response => {
        const gameFilesData = _.filter(response.data.tree, o => {
          return _.startsWith(o.path, 'Content/')
        })
        this.setState({ gameFilesData })
      })
      .catch(err => {
        console.log(`Unable to fetch game content; ${err.message}`)
      })
  }

  render() {
    const {
      docsHtml,
      gameFilesData,
      contentData,
      updateContentData
    } = this.state

    const tabs = [
      {
        label: 'Docs',
        content: <Docs html={docsHtml} />,
        disabled: !docsHtml
      },
      {
        label: 'Templates',
        content: <Templates />,
        disabled: !gameFilesData || true
      },
      {
        label: 'Image',
        content: <Image />,
        disabled: !gameFilesData || true
      },
      {
        label: 'Export',
        content: (
          <ContentDataContext.Consumer>
            {() => (
              <Exporter
                contentData={contentData}
                updateContentData={updateContentData}
              />
            )}
          </ContentDataContext.Consumer>
        )
      },
      {
        label: 'About',
        content: <About />
      }
    ]

    return (
      <div className="app">
        <ContentDataContext.Provider value={{ contentData, updateContentData }}>
          <ContentDataContext.Consumer>
            {() => (
              <ContentEditor
                contentData={contentData}
                updateContentData={updateContentData}
              />
            )}
          </ContentDataContext.Consumer>
          <Sidebar tabs={tabs} />
        </ContentDataContext.Provider>
      </div>
    )
  }
}

export default App
