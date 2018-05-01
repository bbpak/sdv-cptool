import React, { Component } from 'react';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import ChangeItem from './ChangeItem'
import { contentData } from '../data/contentChanges.js';
import _ from 'lodash';

export default class ToolForm extends Component {

  constructor() {
    super();
    this.state = {
      changesData: [{}], // How many change blocks to render
      format: '1.3',
    }
  }

  componentDidMount() {
    console.log(this);
  }

  handleActionChange = (e, data) => {
    this.setState({action: data.value})
  }

  handleDataChange = (data) => {
    let changesData = this.state.changesData;
    changesData.push(data)
    this.setState({changesData});
  }

  render() {
    return (
      <Form inverted className="tool-form">
        <Segment className="form-block">
          <Form.Field inline className='field-item'>
            <label>Format</label>
            <Input className='field-input' value={this.state.format} type='text' />
          </Form.Field>
        </Segment>
        <Segment id='changes-container' className="form-block">
          <Form.Field>
            <label>Changes</label>
            {_.map(this.state.changesData, (changeItem, i) => {
              return (
                <ChangeItem 
                  key={i} 
                  contentData={contentData} 
                  handleActionChange={this.handleActionChange}
                />
              )
            })}
            <Button 
              fluid
              icon='plus'
              size='mini' 
              color='grey'
              onClick={this.handleDataChange}  
            />
          </Form.Field>
        </Segment>
        <div>
          <Form.Button color='grey' className="button-container">
            Generate content.json
          </Form.Button>
        </div>
      </Form>
    );
  }
}
