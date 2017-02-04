/**
 * Created by brianmichael on 2/3/17.
 */
import React from 'react';

const ErrorHistory = props => {

  return (
    <section className="error-history">
      <h3>Errors</h3>
      {
          props.errors.map(error => {
            return (<p key={error._id}>
              {error.message}
            </p>);
          })
        }
    </section>
  );
};


ErrorHistory.propTypes = {
  errors: React.PropTypes.array.isRequired,
};


export default ErrorHistory;
