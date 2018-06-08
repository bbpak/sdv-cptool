import _ from 'lodash'
import axios from 'axios'
import marked from 'marked'
import {
  STATIC_REF,
  DOCS_MD_SRC,
  DOCS_SRC_BASE,
  getDocsHtml,
  CONTENT_TREES_SRC,
  CONTENT_TREES_SRC_REF
} from './constants'

// These are API calls to fetch data for the Content Patcher docs
// as well as the trees for the game's Content files. To avoid
// potentially exceeding the API rate limits, I will be fetching
// static data through BitBucket's API (less strict on API rate)

// For updates, the static data will be fetched from the source (Pathoschild's Repos)
// And the updates will be pushed to the static data in BitBucket.

const config = {
  headers: {
    Accept: 'application/vnd.github.v3.raw'
  }
}

const authConfig = {
  headers: {
    Authorization: `token ${process.env.REACT_APP_PAT}`,
    Accept: 'application/vnd.github.v3.raw'
  }
}

// Fetch static content
export const getStaticContent = () => {
  const docsName = 'ContentPatcherDocs.md'
  const contentName = 'GameContentTrees.min.json'
  var staticContent = { docs: null, contentTrees: null }
  let getDocs
  let getContent

  return new Promise((resolve, reject) => {
    axios
      .get(STATIC_REF, config)
      .then(response => {
        _.map(response.data, gist => {
          if (_.includes(_.keys(gist.files), docsName)) {
            getDocs = axios.get(gist.files[docsName].raw_url).then(resp => {
              staticContent.docs = getDocsHtml(marked(resp.data, DOCS_SRC_BASE))
            })
          } else if (_.includes(_.keys(gist.files), contentName)) {
            getContent = axios
              .get(gist.files[contentName].raw_url)
              .then(resp => {
                staticContent.contentTrees = resp.data
              })
          }
        })

        axios.all([getDocs, getContent]).then(() => {
          resolve(staticContent)
        })
      })
      .catch(err =>
        console.log(`Unable to fetch static content; ${err.message}`)
      )
  })
}

// ------------ USED FOR UPDATING THE GISTS --------------------

export const updateGists = () => {
  this.getDocsSource()
  axios.get(CONTENT_TREES_SRC_REF, authConfig).then(response => {
    this.getContentTreesSource(response.data.object.sha, config)
  })
}

// Fetch docs from repo source
const getDocsSource = () => {
  axios
    .get(DOCS_MD_SRC, authConfig)
    .then(response => {
      // Html for iframe
      const docsHtml = getDocsHtml(marked(response.data))
      return docsHtml
    })
    .catch(err => {
      console.log(`Unable to fetch docs; ${err.message}`)
    })
}

// Fetch content files data from repo source
const getContentTreesSource = (contentSha, config) => {
  axios
    .get(`${CONTENT_TREES_SRC}/${contentSha}?recursive=1`, authConfig)
    .then(response => {
      const contentTrees = _.filter(response.data.tree, o => {
        return _.startsWith(o.path, 'Content/')
      })
      // Only want path and size
      this._removeKeys(contentTrees, ['sha', 'mode', 'url', 'type'])
      return contentTrees
    })
    .catch(err => {
      console.log(`Unable to fetch game content; ${err.message}`)
    })
}

// https://gist.github.com/aurbano/383e691368780e7f5c98
const _removeKeys = (obj, keys) => {
  var index
  for (var prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'string':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          }
          break
        case 'object':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          } else {
            this.removeKeys(obj[prop], keys)
          }
          break
        default:
          break
      }
    }
  }
}
