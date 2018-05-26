import React, { Component } from 'react'
import ContentEditor from './components/ContentEditor'
import Docs from './components/Docs'
import DropBox from './components/DropBox'
import Exporter from './components/Exporter'
import Tabs from './components/Tabs'
import './App.css'

class App extends Component {
  render() {
    const tabs = [
      { 
        label: "Docs",
        content: <Docs />
      },
      { 
        label: "Export",
        content: <Exporter />
      },
    ]

    return (
      <div className="app">
        <ContentEditor />
        <Tabs tabs={tabs} />
      </div>
    )
  }
}

export default App
