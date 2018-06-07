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

    this.getFocusedField = () => {
      const focusedField =
        document.activeElement.lastChild || document.activeElement

      if (focusedField && focusedField.getAttribute('name') === 'Target') {
        this.setState({ targetPath: focusedField.getAttribute('value') })
      } else {
        this.setState({ targetPath: null })
      }
    }

    this.state = {
      docs: null,
      contentTrees: null,
      contentData: null,
      updateContentData: this.updateContentData,
      targetPath: '',
      getFocusedField: this.getFocusedField
    }
  }

  componentDidMount() {
    // Fetch docs html and game content trees
    getStaticContent().then(content => {
      this.setState(
        {
          docs: content.docs,
          contentTrees: content.contentTrees
        },
        console.log('loaded docs and content tree data')
      )
    })
  }

  render() {
    const {
      docs,
      contentTrees,
      contentData,
      updateContentData,
      targetPath,
      getFocusedField
    } = this.state

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
        content: (
          <ContentDataContext.Consumer>
            {() => (
              <Image
                contentTrees={contentTrees}
                getFocusedField={getFocusedField}
                targetPath={targetPath}
              />
            )}
          </ContentDataContext.Consumer>
        ),
        disabled: !contentTrees
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
        <ContentDataContext.Provider value={this.state}>
          <ContentDataContext.Consumer>
            {() => (
              <ContentEditor
                contentTrees={contentTrees}
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
