import React from 'react';

const NetworkLoadAlert = props => {
  if (props.Loading) {
    return (
      <h1>Loading Contacts...</h1>
    );
  }
  return (<div className="load-alert" />);
};

NetworkLoadAlert.propTypes = {
  Loading: React.PropTypes.bool.isRequired,
};

export default NetworkLoadAlert;
