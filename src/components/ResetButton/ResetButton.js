import React, {PropTypes} from 'react';

const ResetButton = props => {
  return (
    <button className="reset-all" type="button" onClick={() => props.onClickReset()}>
      Reset All
    </button>
  );
};

ResetButton.propTypes = {
  onClickReset: PropTypes.func.isRequired
};

export default ResetButton;
