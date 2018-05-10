import React, { Component } from 'react'
import ContentEditor from './components/ContentEditor'
import Docs from './components/Docs'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <ContentEditor />
        <Docs />
      </div>
    )
  }
}

export default App
