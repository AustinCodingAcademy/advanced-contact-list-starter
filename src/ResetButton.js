import React, { PropTypes } from 'react';

const ResetButton = (props) => {
  return (
    <div className="button reset" onClick={() => props.onReset()}>
      Reset List
    </div>
  );
};

export default ResetButton;

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired
};
