/**
 * Created by brianmichael on 2/3/17.
 */
import React from 'react';

const LoadingSpinner = props => {

  if (props.isLoading) {
    return (
      <div>Loading Data...</div>
    );
  } 
  return (
    <div className="hidden" />
  );
  

};

LoadingSpinner.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
};

export default LoadingSpinner;
