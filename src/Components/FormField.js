/**
 * Created by brianmichael on 2/8/17.
 */

import React from 'react';
import TextField from 'material-ui/TextField';

const FormField = props => {

  console.log(props);
  return (
    <TextField className="text-field"
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={(evt) => props.onInputChange(evt)}
      errorText={props.errorText}
      />
  );
};

FormField.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  errorText: React.PropTypes.string
};

export default FormField;
