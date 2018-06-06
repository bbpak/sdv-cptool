import React, { Component } from 'react'
import ContentEditor from './components/ContentEditor'
import Sidebar from './components/Sidebar'
import Docs from './components/tabs/Docs'
import Templates from './components/tabs/Templates'
import Exporter from './components/tabs/Exporter'
import Image from './components/tabs/Image'
import About from './components/tabs/About'
import { getStaticContent } from './static/staticFetcher'
import { ContentDataContext } from './data/DataContext'

import './App.css'

class App extends Component {
  constructor() {
    super()

    this.updateContentData = contentData => {
      this.setState({ contentData })
    }

    this.state = {
      docs: null,
      contentTrees: null,
      contentData: null,
      updateContentData: this.updateContentData
    }
  }

  componentDidMount() {
    getStaticContent().then(content => {
      this.setState({
        docs: content.docs,
        contentTrees: content.contentTrees
      })
    })
  }

  render() {
    const { docs, contentTrees, contentData, updateContentData } = this.state

    const tabs = [
      {
        label: 'Docs',
        content: <Docs html={docs} />,
        disabled: !docs
      },
      {
        label: 'Templates',
        content: <Templates />,
        disabled: !contentTrees || true
      },
      {
        label: 'Image',
        content: <Image />,
        disabled: !contentTrees || true
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
