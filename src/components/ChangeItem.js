import React, { Component } from 'react';
import { Form, Select, Icon, Input } from 'semantic-ui-react';
import _ from 'lodash';

export default class ChangeItem extends Component {

  constructor() {
    super();
    this.state = {
      isCollapsed: false,
      action: 'Load',
      data: {}
    }
  }

  handleActionChange = (e, data) => {
    this.setState({action: data.value});
  }

  handleDataChange = (data) => {
    this.props.handleDataChange(data);
  }

  renderActions = () => {
    return (
      <Form.Field inline className='field-item'>
        <label className='field-label'>Action</label>
        <Select
          className='field-input'
          value={this.state.action}
          options={
            _.map(_.keys(this.props.contentData), (action, i) => {
              return {
                key: i,
                text: action,
                value: action
              }
            })
          }
          onChange={this.handleActionChange}
        />
      </Form.Field>
    );
  }

  renderFields = () => {
    const fields = this.props.contentData[this.state.action];

    return (
      <div>
        {_.map(_.keys(fields), (field, i) => {
          return (
            field === 'Optional' ? null :
            <Form.Field inline className='field-item' key={i}>
              <label className='field-label'>{field}</label>
              <Input 
                className='field-input'
                type='text'
                value={fields[field]} 
              />
            </Form.Field>)
          })
        }
      </div>
    );
  }

  handleCollapseClick = () => {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render() {  
    return (
      <div className='change-block'>
        <div 
          style={{
            position: 'absolute', 
            left: 0, 
            right: 0, 
            top: 0, 
            cursor: 'pointer' 
          }} 
          onClick={this.handleCollapseClick}
        >
          <Icon style={{width: '100%'}} name={this.state.isCollapsed ? 'angle down' : 'angle up'} />
        </div>
        <div style={this.state.isCollapsed ? {display: 'none'} : {display: 'block'}}>
          {this.renderActions()}
          {this.renderFields()}
        </div>
      </div>
    );
  }
}
