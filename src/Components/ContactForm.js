/**
 * Created by brianmichael on 2/2/17.
 */

import React from 'react';

import FormField from './FormField';

const ContactForm = props => {

  console.log(props.validationErrors);
  return (
    <section>
      <form className="contact-form"
        onSubmit={(evt) => props.handleAddContactSubmit(evt)}>
        <FormField
          placeholder="Name"
          name="name"
          value={props.contact.name}
          onInputChange={(evt) => props.onInputChange(evt)}
          errorText={props.validationErrors.name} />

        <FormField
          placeholder="Occupation"
          name="occupation"
          value={props.contact.occupation}
          onInputChange={(evt) => props.onInputChange(evt)}
          errorText={props.validationErrors.occupation}
          />
        <FormField className="text-field"
          placeholder="Avatar Link"
          name="avatar"
          value={props.contact.avatar}
          onInputChange={(evt) => props.onInputChange(evt)}
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
