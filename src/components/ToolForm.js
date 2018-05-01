import React, { Component } from 'react';
import { Form, Input, Button, Icon, Select, Segment } from 'semantic-ui-react';
import _ from 'lodash';

export default class ToolForm extends Component {

  constructor() {
    super();
    this.state = {
      changes: [{}], // How many change blocks to render
      format: '1.3',
      action: 'Load'
    }

    // TODO: Instead of hardcoding this fetch it from docs
    this.changesData = {
      Load: {
        Target: "",
        FromFile: "",
        LogName: "",
        Enabled: "",
        When: ""
      },
      EditImage: {
        Target: "",
        FromFile: "",
        FromArea: {'X': 0, 'Y': 0, 'Width': 16, 'Height': 16},
        ToArea: {'X': 0, 'Y': 0, 'Width': 16, 'Height': 16},
        PatchMode: "",
        LogName: "",
        Enabled: "",
        When: ""
      },
      EditData: {
        Target: "",
        Fields: {},
        Entries: {},
        LogName: "",
        Enabled: "",
        When: ""
      }
    }
  }

  renderActions = () => {
    return (
      <Form.Field>
        <label>Action</label>
        <Select
          
          options={
            _.map(_.keys(this.changesData), (action, i) => {
              return {
                key: i,
                text: action,
                value: action.toLowerCase()
              }
            })
          }
        />
      </Form.Field>
    );
  }

  renderChangeItem = (changeItem, i) => {
    return (
      <div key={i} className='change-block'>
        {this.renderActions()}
      </div>
    );
  }

  handleAddItemClick = () => {
    let changes = this.state.changes;
    changes.push({});
    this.setState({changes});
  }

  render() {
    return (
      <Form inverted className="tool-form">
        <Segment className="form-block">
          <Form.Field>
            <label>Format</label>
            <Input value={this.state.format} />
          </Form.Field>
        </Segment>
        <Segment id='changes-container' className="form-block">
          <Form.Field>
            <label>Changes</label>
            {_.map(this.state.changes, (changeItem, i) => {
              return this.renderChangeItem(changeItem, i)
            })}
            <Button 
              fluid
              icon
              size='mini' 
              onClick={this.handleAddItemClick}  
            >
              <Icon name='plus' />
            </Button>
          </Form.Field>
        </Segment>
      </Form>
    );
  }
}
