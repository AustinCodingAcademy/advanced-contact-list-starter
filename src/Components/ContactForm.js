/**
 * Created by brianmichael on 2/2/17.
 */

import React from 'react';
import TextField from 'material-ui/TextField';

const ContactForm = props => {

  return (
    <section>
      <form className="contact-form"
        onSubmit={(evt) => props.handleAddContactSubmit(evt)}>
        <TextField className="text-field"
          placeholder="Name"
          name="name"
          value={props.contact.name}
          onChange={(evt) => props.onInputChange(evt)}
          errorText={props.validationErrors.name}
              />
        <TextField className="text-field"
          placeholder="Occupation"
          name="occupation"
          value={props.contact.occupation}
          onChange={(evt) => props.onInputChange(evt)}
          errorText={props.validationErrors.occupation}
              />
        <TextField className="text-field"
          placeholder="Avatar Link"
          name="avatar"
          value={props.contact.avatar}
          onChange={(evt) => props.onInputChange(evt)}
          errorText={props.validationErrors.avatar}
              />
      </form>
    </section>
  );

};

ContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  validationErrors: React.PropTypes.object.isRequired,
};

export default ContactForm;
