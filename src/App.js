import React, { Component } from 'react'
import ContentEditor from './components/ContentEditor'
import Sidebar from './components/Sidebar'
import Docs from './components/tabs/Docs'
import Templates from './components/tabs/Templates'
import Exporter from './components/tabs/Exporter'
import Image from './components/tabs/Image'
import About from './components/tabs/About'
import './App.css'

class App extends Component {
  render() {
    const tabs = [
      {
        label: 'Docs',
        content: <Docs />
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
