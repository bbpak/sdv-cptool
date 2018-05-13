
import React from 'react';

const withSubscription = (WrappedComponent) => {
  class FormHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }

  return FormHOC
}

export default withStore