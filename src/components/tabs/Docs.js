import React, { Component } from 'react'
import axios from 'axios'
import marked from 'marked'
import { auth, repo } from '../../keys/api'
import _ from 'lodash'

export default class Docs extends Component {
  constructor() {
    super()
    this.baseUrl = "https://github.com/Pathoschild/StardewMods/raw/develop/ContentPatcher"
  }

  componentDidMount() {
    axios
      .get(repo.DOCS_URL, {
        token: auth.TOKEN,
        headers: { accept: 'application/vnd.github.v3.raw' }
      })
      .then(response => {
        const iframe = document.getElementById('docs')
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document
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
                  Sourced from <a href=${this.baseUrl} target="_blank" >${this.baseUrl}</a>
                </small>
              </article>
            </body>
            </html>
          `
        iframeDoc.open()
        iframeDoc.write(html)
        iframeDoc.close()
        this.patchHtml()
        this.forceUpdate()
      })
  }

  // Patch the html to handle links and anchors
  // that don't do well in the iframe
  patchHtml = () => {
    const iframe = document.getElementById('docs')
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    const anchors = iframeDoc.getElementsByTagName('a')
    _.map(anchors, anchor => {
      // Open external sites in new tab
      if (!anchor.href.includes('#')) anchor.target = '_blank'
    })

    const images = iframeDoc.getElementsByTagName('img')
    // Correct image links
    _.map(images, img => {
      img.src = `${this.baseUrl}/docs${img.src.split('/docs').pop()}`
    })
  }

  render() {
    return (
      <div className="docs">
        <iframe
          id="docs"
          title="docs"
          frameBorder="0"
          width="50%"
          height="100%"
        />
      </div>
    )
  }
}
