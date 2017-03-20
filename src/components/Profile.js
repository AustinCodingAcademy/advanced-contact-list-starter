import React, { PropTypes } from 'react';

const Profile = (props) => {
  console.log(props.contact);
  return (
    <div className="Profile">
      <div className="image-cropper">
        <img src={props.contact.avatar} alt="Avatar" />
      </div>
      <div className="contact-info">
        <h2>Name: {props.contact.name}</h2>
        <span>Occupation: {props.contact.occupation}</span>
      </div>
    </div>
  );
};

Profile.propTypes = {
  contact: PropTypes.object
};

export default Profile;
