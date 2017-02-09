/**
 * Created by brianmichael on 2/3/17.
 */
import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingSpinner = props => {

  if (props.isLoading) {
    return (
      <RefreshIndicator
        className="loading-spinner"
        size={75}
        left={10}
        top={0}
        status="loading"
        loadingColor="#FF9800"
        />
    );
  } 
  return (
   <div></div>
  );
  

};

LoadingSpinner.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
};

export default LoadingSpinner;
