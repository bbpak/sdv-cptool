import React, { Component } from 'react'
import ToolForm from './components/ToolForm'
import Docs from './components/Docs'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <ToolForm />
        <Docs />
      </div>
    )
  }
}

export default App
