import React, { Component } from 'react'
import ContentEditor from './components/ContentEditor'
import Docs from './components/Docs'
import Exporter from './components/Exporter'
import Sidebar from './components/Sidebar'
import About from './components/About'
import './App.css'

class App extends Component {
  render() {
    const panels = [
      {
        label: 'Docs',
        content: <Docs />
      },
      {
        label: 'Templates',
        content: null,
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
        <Sidebar panels={panels} />
      </div>
    )
  }
}

export default App
