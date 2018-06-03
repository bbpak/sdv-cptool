import React, { Component } from 'react'
import _ from 'lodash'

// Hardcoded HTML from Pathoschild's GitHub README
// Previous trials with fetching markdown with github API
// and parsing it into HTML and setting innerHTML 
// or setting srcDoc with an iframe does not look
// as clean this method.. So I'm willing to sacrifice
// lack of maintainability for aesthetics
const Docs = () => (
  <div className="docs">
    <iframe
      id="docs"
      title="docs"
      src="./docs.html"
      frameBorder="0"
      width="100%"
      height="100%"
    />
  </div>
)
  


export default Docs