import React from 'react';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};

class Checkbox extends React.Component {

  render() {
    const props = this.props;

    return (
      <div style={divStyle}>
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
