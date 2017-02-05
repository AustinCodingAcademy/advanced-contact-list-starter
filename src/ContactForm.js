/**
 * Created by brianmichael on 2/2/17.
 */

import React from 'react';

const ContactForm = props => {

  return (
    <section>
      <h3>Add a new Contact</h3>
      <button
        className="fa fa-times"
        onClick={props.handleFormClose}
       />
      <form className="new-contact-form"
        onSubmit={(evt) => props.handleAddContactSubmit(evt)}>
        <input
          placeholder="Name"
          name="name"
          value={props.contact.name}
          onChange={(evt) => props.onInputChange(evt)}
              />
        <span style={{color: 'red'}}>{props.validationErrors.name}</span>
        <input
          placeholder="Occupation"
          name="occupation"
          value={props.contact.occupation}
          onChange={(evt) => props.onInputChange(evt)}
              />
        <span style={{color: 'red'}}>{props.validationErrors.occupation}</span>
        <input
          placeholder="Avatar Link"
          name="avatar"
          value={props.contact.avatar}
          onChange={(evt) => props.onInputChange(evt)}
              />
        <span style={{color: 'red'}}>{props.validationErrors.avatar}</span>
        <input type="submit" />
      </form>
    </section>
  );

};

ContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  handleAddContactSubmit: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  validationErrors: React.PropTypes.object.isRequired,
  handleFormClose: React.PropTypes.func.isRequired
};

export default ContactForm;
