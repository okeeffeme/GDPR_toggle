import React from 'react';

import './Checkbox.css';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};

class Checkbox extends React.Component {

  render() {
    const props = this.props;

    return (
      <div className="checkbox" style={divStyle}>
        <input
          type="checkbox"
          id={props.label}
          name={props.label}
          value={props.label}
        />
      <label htmlFor={props.label}>{props.label}</label>
      <p>{props.description}</p>
    </div>
    );
  }
}




export default Checkbox;
