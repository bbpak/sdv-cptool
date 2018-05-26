import React, { Component } from 'react';
import _ from 'lodash'
import withStore from './hocs/withStore'

class Exporter extends Component {
  exportData = () => {
    const data = _.omitBy(this.props.contentData, _.isNull);

    var file = new Blob([JSON.stringify(data, null, "\t")], {type: 'text'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'content.json');
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'content.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }

  render() {
    return (
      <div className="exporter">
      </div>
    )
  }
}

const WrappedComponent = withStore(Exporter)
export default WrappedComponent
