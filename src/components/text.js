import React from 'react';

const Text = (props) => {
  return (
    <span style={props.divStyle}>
      {props.text}
    </span>
  );
};

export default Text;

Text.propTypes = {
  divStyle: React.PropTypes.object,
  text: React.PropTypes.string,
};
