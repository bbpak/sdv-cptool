import React, { Component } from 'react'
import axios from 'axios'
import marked from 'marked'
import { auth, repo } from '../../keys/api'
import _ from 'lodash'

export default class Docs extends Component {
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
    console.log('hi')
    const iframe = document.getElementById('docs')
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    const anchors = iframeDoc.getElementsByTagName('a')
    const headers = iframeDoc.getElementsByTagName('h3')
    _.map(anchors, anchor => {
      // Open external sites in new tab
      if (!anchor.href.includes('#')) anchor.target = '_blank'
    })
    // Use name instead of anchor hashtag to prevent page scroll
    _.map(headers, header => {
      header.innerHTML = `<a name=${header.id}>${header.innerHTML}</a>`
    })
  }

  render() {
    window ? (window.scrollTop = 0) : null

    return (
      <div className="docs">
        <iframe
          id="docs"
          title="docs"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    )
  }
}
