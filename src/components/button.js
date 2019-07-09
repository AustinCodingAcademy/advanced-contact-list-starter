import React from 'react';

const Button = (props) => {

  return (
    <button onClick={props.onClick}>
      {props.buttonText}
    </button>

  );
};

export default Button;

Button.propTypes = {
  onClick: React.PropTypes.func,
  buttonText: React.PropTypes.string
};
