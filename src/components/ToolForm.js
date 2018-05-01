import React, { Component } from 'react'
import { Form, Input, Button, Segment, Icon } from 'semantic-ui-react'
import ChangeItem from './ChangeItem'
import { contentData } from '../data/contentChanges.js'
import _ from 'lodash'

export default class ToolForm extends Component {
  constructor() {
    super()
    this.state = {
      changesData: [{ action: 'Load' }], // Array of change items
      format: '1.3'
    }
  }

  componentDidMount() {
    console.log('Made with 🤔 by Bouhm')
  }

  handleAddItem = () => {
    let changesData = this.state.changesData
    changesData.push({ action: 'Load' })
    this.setState({ changesData })
  }

  handleRemoveItem = i => {
    let changesData = this.state.changesData
    _.pullAt(changesData, i)
    this.setState({ changesData })
  }

  handleDataChange = (data, i) => {
    let changesData = this.state.changesData
    changesData[i] = data
    this.setState({ changesData })
  }

  render() {
    const { changesData, format } = this.state

    return (
      <div className="form-container">
        <Form inverted className="tool-form">
          <Segment className="form-block">
            <Form.Field inline className="field-item">
              <label>Format</label>
              <Input className="field-input" value={format} type="text" />
            </Form.Field>
          </Segment>
          <Segment id="changes-container" className="form-block">
            <Form.Field>
              <label>Changes</label>
              {_.map(changesData, (changeItem, i) => {
                return (
                  <ChangeItem
                    key={i}
                    index={i}
                    contentData={contentData}
                    itemData={changesData[i]}
                    handleDataChange={this.handleDataChange}
                    handleRemoveItem={this.handleRemoveItem}
                  />
                )
              })}
              <Button
                fluid
                icon="plus"
                size="mini"
                color="grey"
                onClick={this.handleAddItem}
              />
            </Form.Field>
          </Segment>
          <div>
            <Form.Button color="blue" className="button-container">
              Export content.json
            </Form.Button>
          </div>
        </Form>
        <span className="footer">
          <Icon link name="github" />
        </span>
      </div>
    )
  }
}
