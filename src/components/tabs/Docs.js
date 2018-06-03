import React, { Component } from 'react'
import GitHub from 'github-api'
import axios from 'axios'
import marked from 'marked'
import { auth, repo } from '../../keys/api'
import '../styles/docs.css'

// Literally copied the html of the README from
// Pathoschild's github and displaying it in an iframe
// Tried to fetch it from URL but github was like no
export default class Docs extends Component {
  state = { html: null, hidden: true }

  componentDidMount() {
    const gh = axios.create({
      baseURL: 'https://api.github.com',
      token: auth.TOKEN,
      headers: {'accept': 'application/vnd.github.v3.raw'}
    });
    gh.get(repo.DOCS_URL).then(response => {
      this.setState({html: {__html: marked(response.data)}})
    })
  }

  handleLabelClick = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    return (
      <div className="docs">
        <div className="docs-html" dangerouslySetInnerHTML={this.state.html}/>
      </div>
    )
  }
}
