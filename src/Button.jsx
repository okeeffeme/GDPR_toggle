import React from 'react';

class Button extends React.Component {

  render() {
    const props = this.props;

    return (
      <button
       onClick={props.onClick}
       color={props.color || "#841584"}
       accessibilityLabel={props.accessibilityLabel || "Learn more about this purple button"}
       >
      {props.title}
      {props.children}
      </button>
    );
  }
}



// const Button = (props) => (
//  <button
//   onClick={props.onClick}
//   color={props.color || "#841584"}
//   accessibilityLabel={props.accessibilityLabel || "Learn more about this purple button"}
//   >
//   {props.title || "Learn More"}
//  </button>
// );


export default Button;
