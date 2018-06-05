import React from 'react'

const About = () => (
  <div className="panel about">
    <p>
      This is a tool intended to make creating/editing Content Packs easier.
      While the original goal was to provide a friendlier editor for users who
      find JSON daunting (but he's a nice guy), I plan on making it fully
      featured to make it useful for all users.
    </p>
    <div>
      <b>Planned features:</b>
      <ul>
        <li>Add minimal image viewer for EditImage for showing Target image</li>
        <li>
          A tool for the image viewer to get pixel position, width, and height
        </li>
        <li>Expand exporter for creating manifest.json and config.json</li>
        <li>Add support for using Config Schema</li>
        <li>Improve auto-generation of content with folder drag-n-drop</li>
        <li>Add templates</li>
        <li>Add support for importing content.json</li>
        <li>Add more stuff to this side panel</li>
        <li>Add a light theme</li>
        <li>Add dark overlay to the light theme so it's dark anyway</li>
        <li>Make desktop Electron app</li>
      </ul>
    </div>
    <p>
      Ping me <span style={{ color: '#6D9EFF' }}>@Bouhm</span>&nbsp;&nbsp;
      <img
        style={{
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
        alt=":SDVPufferPing:"
        src="https://cdn.discordapp.com/emojis/423125623439884290.png?v=1"
        width="25px"
        height="25px"
      />&nbsp; on Discord for suggestions, complaints, knock-knock jokes, etc.
    </p>
    <b>
      <pre>
        CURRENT BUILD: <i>0.0.1-ALPHA</i>
      </pre>
    </b>
  </div>
)

export default About
