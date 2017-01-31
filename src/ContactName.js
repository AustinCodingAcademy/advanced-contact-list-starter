import React, {PropTypes} from 'react';

const ContactName = props => {

  const contactName = props.name;
  const checkName = props.name.toLowerCase();
  const stringToHighlight = props.searchText.toLowerCase();
  const searchTermStartIndex = checkName.indexOf(stringToHighlight);
  const searchTermEndIndex = searchTermStartIndex + stringToHighlight.length;

  if (props.name.toLowerCase().indexOf(stringToHighlight) >= 0) {
    const highlightedContactBeginning = contactName.slice(0, searchTermStartIndex);
    const highlightedContactEnd = contactName.slice(searchTermEndIndex);
    const highlightedContactMiddle = contactName.slice(searchTermStartIndex, searchTermEndIndex);

    return (
      <h2 onClick={() => props.onClickSelect(props._id)}>
        {highlightedContactBeginning}
        <span className="highlight-search-term">
          {highlightedContactMiddle}
        </span>
        {highlightedContactEnd}
      </h2>
    );
  }
};

ContactName.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  onClickSelect: PropTypes.func.isRequired
};

export default ContactName;
