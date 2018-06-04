import React, { Component } from 'react'
import axios from 'axios'
import marked from 'marked'

import ContentEditor from './components/ContentEditor'
import Sidebar from './components/Sidebar'
import Docs from './components/tabs/Docs'
import Templates from './components/tabs/Templates'
import Exporter from './components/tabs/Exporter'
import Image from './components/tabs/Image'
import About from './components/tabs/About'
import { DOCS_MD_URL, DOCS_BASE_URL } from './constants'
import { auth } from './keys/api'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = { docsHtml: null }
  }

  componentDidMount() {
    this.getDocs()
  }

  // Fetch docs from GitHub
  getDocs = () => {
    axios
      .get(DOCS_MD_URL, {
        token: auth.TOKEN,
        headers: { accept: 'application/vnd.github.v3.raw' }
      })
      .then(response => {
        const html = `
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
        this.setState({ docsHtml: html })
      })
  }

  render() {
    const tabs = [
      {
        label: 'Docs',
        content: <Docs html={this.state.docsHtml} />
      },
      {
        label: 'Templates',
        content: <Templates />,
        disabled: true
      },
      {
        label: 'Image',
        content: <Image />,
        disabled: true
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
