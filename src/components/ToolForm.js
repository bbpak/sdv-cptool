import React, { Component } from 'react';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import ChangeItem from './ChangeItem'
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

  handleAddItemClick = () => {
    let changes = this.state.changes;
    changes.push({});
    this.setState({changes});
  }

  render() {
    return (
      <Form inverted className="tool-form">
        <Segment className="form-block form-container">
          <Form.Field>
            <label>Format</label>
            <Input value={this.state.format} />
          </Form.Field>
        </Segment>
        <Segment id='changes-container' className="form-block">
          <Form.Field>
            <label>Changes</label>
            {_.map(this.state.changes, (changeItem, i) => {
              return <ChangeItem key={i} changesData={this.changesData} />
            })}
            <Button 
              fluid
              icon='plus'
              size='mini' 
              onClick={this.handleAddItemClick}  
            />
          </Form.Field>
        </Segment>
        <div>
          <Form.Button className="button-container">
            Generate content.json
          </Form.Button>
        </div>
      </Form>
    );
  }
}
