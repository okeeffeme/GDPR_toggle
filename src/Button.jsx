import React from 'react';

const Button = (props) => (
 <button
  onClick={props.onPress}
  color={props.color || "#841584"}
  accessibilityLabel={props.accessibilityLabel || "Learn more about this purple button"}
  >
  {props.title || "Learn More"}
 </button>
);


export default Button;
