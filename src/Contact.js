import React, { PropTypes } from 'react';



const Contact = props => {
  const name = props.name;
  let nameStart;
  let nameMiddle;
  let nameEnd;
  if (props.searchValue.length > 0) {
    const term = props.searchValue.toLowerCase();
    const valueIndex = name.toLowerCase().indexOf(term);
    nameStart = name.slice(0, valueIndex);
    nameMiddle = name.slice(valueIndex, valueIndex + term.length);
    nameEnd = name.slice(valueIndex + term.length);
  }

  return (
    <li className="contact" onClick={() => props.onSelect(props._id)}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>
          {/*
            nameMiddle is the one that gets highlighted, so check for truthiness there.
            If nameMiddle is truthy we put spans around it. Otherwise spans go at the end
            of the name
          */}
          {nameMiddle ? nameStart : name}
          <span className="highlight">{nameMiddle ? nameMiddle : null}</span>
          {nameMiddle ? nameEnd : null}
        </h2>
        {props.occupation}
      </div>
      <div className="button remove" onClick={e => props.onRemove(e, props._id)}>
        Remove
      </div>
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  _id: PropTypes.number.isRequired
};

export default Contact;
