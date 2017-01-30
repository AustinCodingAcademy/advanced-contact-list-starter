import React, {PropTypes, Component} from 'react';

class ContactName extends Component {

  highlightSearchTerm() {
    const contactName = this.props.name;
    const checkName = this.props.name.toLowerCase();
    const stringToHighlight = this.props.searchText.toLowerCase();
    const searchTermStartIndex = checkName.indexOf(stringToHighlight);
    const searchTermEndIndex = searchTermStartIndex + stringToHighlight.length;

    if (this.props.name.toLowerCase().indexOf(stringToHighlight) >= 0) {
      const highlightedContactBeginning = contactName.slice(0, searchTermStartIndex);
      const highlightedContactEnd = contactName.slice(searchTermEndIndex);
      const highlightedContactMiddle = contactName.slice(searchTermStartIndex, searchTermEndIndex);

      return (
        `${highlightedContactBeginning}<span className="highlight-search-term">${highlightedContactMiddle}</span>${highlightedContactEnd}`
      );
    }
  }

  render() {
    return (
      <h2 onClick={() => this.props.onClickSelect(this.props._id)}>
        {this.highlightSearchTerm()}
      </h2>
    );
  }
}

ContactName.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  onClickSelect: PropTypes.func.isRequired
};

export default ContactName;
