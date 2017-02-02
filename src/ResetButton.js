import React, { PropTypes } from 'react';

const ResetButton = props => {
  return (
    <div className="reset-button">
      <button onClick={() => props.onResetClick()}>Reset</button>
    </div>
  );
};

export default ResetButton;

ResetButton.propTypes = {
  onResetClick: PropTypes.func.isRequired
};
