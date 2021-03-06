import React, { Component } from 'react'
import _ from 'lodash'
import { DOCS_SRC_BASE } from '../../static/constants'
import '../styles/github-md.css'

export default class Docs extends Component {
  componentDidMount() {
    this.patchDocsHtml()
  }

  // Patch the html to handle links and anchors
  patchDocsHtml = () => {
    const docs = document.getElementById('docs')
    const anchors = docs.getElementsByTagName('a')
    _.map(anchors, anchor => {
      // Open external sites in new tab
      if (!anchor.href.includes('#')) anchor.target = '_blank'
      if (anchor.href.includes('.md'))
        anchor.href = `${DOCS_SRC_BASE.replace(
          'raw',
          'tree'
        )}/${anchor.href.split('/').pop()}`
    })

    const images = docs.getElementsByTagName('img')
    // Correct image links
    _.map(images, img => {
      img.src = `${DOCS_SRC_BASE}/docs${img.src.split('/docs').pop()}`
    })
  }

  render() {
    return (
      <div className="docs-container">
        <div id="docs" dangerouslySetInnerHTML={{ __html: this.props.html }} />
      </div>
    )
  }
}
