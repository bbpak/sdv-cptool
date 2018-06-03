import React, { Component } from 'react'
import _ from 'lodash'

export default class Docs extends Component {
  componentDidMount() {
    const iframe = document.getElementById('docs')
    const iframeDoc =
      iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.open()
    iframeDoc.write(this.props.html)
    iframeDoc.close()
    this.patchDocsHtml()
  }

  // Patch the html to handle links and anchors
  // that don't do well in the iframe
  patchDocsHtml = () => {
    const docsUrl = "https://github.com/Pathoschild/StardewMods/raw/develop/ContentPatcher"
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
      img.src = `${docsUrl}/docs${img.src.split('/docs').pop()}`
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
