/**
 * Created by brianmichael on 1/31/17.
 */
import React, {Component} from 'react';

class Highlighter extends Component {

  componentWillMount() {
    this.buildSpans();
  }

  buildSpans() {

    const results = {};

        // Build a regex based upon the search terms
    const regex = new RegExp(this.props.searchWords);
    const originalString = this.props.textToHighlight;

        // get the starting index
    const result = originalString.search(regex);

        // find the ending index
    const endingIndex = result + this.props.searchWords.length;

        // Build the strings for three different spans, with one being highlighted, the rest regular
    results.firstChunk = originalString.slice(0, result);
    results.highlightedChunk = originalString.slice(result, endingIndex);
    results.lastChunk = originalString.slice(endingIndex, originalString.length);

    return results;

  }

  render() {
    return (
      <div className="highlighter">
        <span>{this.buildSpans().firstChunk}</span>
        <span><mark>{this.buildSpans().highlightedChunk}</mark></span>
        <span>{this.buildSpans().lastChunk}</span>
      </div>
    );
  }

}

Highlighter.propTypes = {
  searchWords: React.PropTypes.string,
  textToHighlight: React.PropTypes.string
};

export default Highlighter;
