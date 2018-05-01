import React, { Component } from 'react';
import { Form, Select, Icon } from 'semantic-ui-react';
import _ from 'lodash';

export default class ChangeItem extends Component {

  constructor() {
    super();
    this.state = {
      isCollapsed: false
    }
  }

  renderActions = () => {
    return (
      <Form.Field style={this.state.isCollapsed ? {display: 'none'} : {display: 'block'}}>
        <label>Action</label>
        <Select
          options={
            _.map(_.keys(this.props.changesData), (action, i) => {
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

  handleCollapseClick = () => {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render() {
    return (
      <div className='change-block'>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0 }} onClick={this.handleCollapseClick}>
          <Icon style={{width: '100%'}} name={this.state.isCollapsed ? 'angle down' : 'angle up'} />
        </div>
        {this.renderActions()}
      </div>
    );
  }
}
