import React from 'react';

import './Checkbox.css';

const divStyle = {
};

class Checkbox extends React.Component {

  render() {
    const props = this.props;

    return (
      <div className="checkbox" style={divStyle}>
        <input
          type="checkbox"
          id={props.label}
          onClick={props.onClick}
          onChange={props.onChange}
          name={props.label}
          checked={this.checked}
          value={props.label}
          key={props.label}
        />
      <label htmlFor={props.label}>{props.label}</label>
      <p>{props.description}</p>
    </div>
    );
  }
}




export default Checkbox;
