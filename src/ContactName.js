import React, {PropTypes} from 'react';

/* eslint-disable max-len */
const ContactName = props => {

  const contactName = props.name;
  const checkContactName = props.name.toLowerCase();
  const searchTextToHighlight = props.searchText.toLowerCase();
  const startIndexToHighlight = checkContactName.indexOf(searchTextToHighlight);
  const endIndexToHighlight = startIndexToHighlight + searchTextToHighlight.length;

  if (startIndexToHighlight >= 0) {
    // each of these variables are breaking the searched name typed out into seperate parts (arrays)

    // this selects the first part of the name that the user is not searching for
    const startIndex = contactName.slice(0, startIndexToHighlight);

    // this selects the actual part of the text that the user is typing out so that it can be highlighted
    const actualHighlightText = contactName.slice(startIndexToHighlight, endIndexToHighlight);

    // this selects the last part of the name that the user is not searching for
    const endIndex = contactName.slice(endIndexToHighlight);

    return (
      <h3>
        {startIndex}
        <span className="highlight">
          {actualHighlightText}
        </span>
        {endIndex}
      </h3>
    );
  }

};

export default ContactName;

ContactName.propTypes = {
  name: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired
};
