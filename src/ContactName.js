import React from 'react';

//   HIGHLIGHTS THE searchText IN THE CONTACT NAME

const ContactName = props => {
  const contactName = props.name;
  const contactNameLower = contactName.toLowerCase();
  const searchTextToHighlight = props.searchText.toLowerCase();
  const startIndexToHighlight = contactNameLower.indexOf(searchTextToHighlight);
  const endIndexToHighlight = startIndexToHighlight + searchTextToHighlight.length;


    //  If there is searchText >> separate the name into 3 parts:
    //       >Beginning of name that isn't part of searchText
    //       >searchText in Contact Name
    //       >End of name that isn't part of searchText
    //  then return JSX
  if (startIndexToHighlight > -1) {
    const beginningOfName = contactName.slice(0, startIndexToHighlight);
    const highlightedText = contactName.slice(startIndexToHighlight, endIndexToHighlight);
    const endOfName = contactName.slice(endIndexToHighlight);

    return (
      <h3>
        {beginningOfName}
        <span className="highlight">{highlightedText}</span>
        {endOfName}
      </h3>
    );
  }
};

export default ContactName;
