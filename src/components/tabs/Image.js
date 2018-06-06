import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { CONTENT_RAW_SRC } from '../../static/constants'
import DataParser from '../../data/DataParser'

export default class Image extends Component {
  state = { imgSrc: null }

  componentDidUpdate(prevProps) {
    const { targetPath, contentTrees } = this.props
    if (prevProps.targetPath === targetPath) return
    if (targetPath === null) {
      this.setState({ imgSrc: null })
      return
    }

    let imgSrc

    if (sessionStorage.getItem(targetPath)) {
      imgSrc = sessionStorage.getItem(targetPath)

      if (this.state.imgSrc !== imgSrc) this.setState({ imgSrc })
      if (sessionStorage.length > 9) {
        sessionStorage.clear()
      }
    } else {
      let imgPath
      if (
        DataParser.validateContentPath(
          targetPath,
          contentTrees,
          '.png',
          contentPath => {
            imgPath = contentPath
          }
        )
      ) {
        const config = {
          headers: {
            Authorization: `token ${process.env.PAT}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }

        axios
          .get(`${CONTENT_RAW_SRC}/${imgPath}?raw=false`, config)
          .then(response => {
            imgSrc = 'data:image/png;base64,' + response.data.content
            sessionStorage.setItem(targetPath, imgSrc)
            this.setState({ imgSrc })
          })
      }
    }
  }

  render() {
    const { imgSrc } = this.state
    const blank = (
      <div>
        Click on a <code>Target</code> field with a valid target path to see the
        image.
      </div>
    )

    if (!imgSrc) {
      return <div className="image">{blank}</div>
    }

    return <div className="image">{imgSrc ? <img src={imgSrc} /> : blank}</div>
  }
}
