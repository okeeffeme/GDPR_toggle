import React from 'react';

class Checkbox extends React.Component {

  render() {
    const props = this.props;

    return (
      <div>
        <input
          type="checkbox"
          id={props.label}
          name={props.label}
          value={props.label}
        />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
    );
  }
}




export default Checkbox;
