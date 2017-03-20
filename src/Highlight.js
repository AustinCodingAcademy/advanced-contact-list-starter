import React, { PropTypes, Component } from 'react';

class Highlight extends Component {

  getIndices() {
    const search = this.props.search.toLowerCase();
    const origName = this.props.name;
    const name = origName.toLowerCase();
    const idxArr = [];
    const highlight = {};
    for (let i = 0; i < search.length; i++) {
      if (name[i] === search[i]) {
        idxArr.push(i);
      }
    }
    if (idxArr.length === 1) {
      highlight.isHL = origName.slice(0,1);
      highlight.noHL = origName.slice(1);
    } else if (idxArr.length > 1) {
      highlight.isHL = origName.slice(idxArr[0],idxArr[idxArr.length - 1] + 1);
      highlight.noHL = origName.slice(idxArr[idxArr.length - 1] + 1);
    } else {
      highlight.noHL = origName;
    }
    return (highlight);
  }

  render() {
    const indices = this.getIndices();
    return (
      <div>
        <h2 className="highlight">
          <span><mark>{indices.isHL}</mark></span>
          <span>{indices.noHL}</span>
        </h2>
      </div>
    );
  }
}

export default Highlight;

Highlight.propTypes = {
  name: PropTypes.string,
  search: PropTypes.string
};
