/**
 * Created by brianmichael on 1/31/17.
 */
import React, {Component} from 'react';

class Highlighter extends Component {

    componentWillMount(){
        this.buildSpans();
    }

    buildSpans(){

        let results = {};

        //Build a regex based upon the search terms
        let regex = new RegExp(this.props.searchWords);
        let originalString = this.props.textToHighlight;

        //get the starting index
        let result = originalString.search(regex);

        //find the ending index
        let endingIndex = result + this.props.searchWords.length;

        //Build the strings for three different spans, with one being highlighted, the rest regular
        results.firstChunk = originalString.slice(0, result);
        results.highlightedChunk = originalString.slice(result, endingIndex);
        results.lastChunk = originalString.slice(endingIndex, originalString.length);

        return results;

    }

    render(){
        return (
            <div className="highlighter">
                <span>{this.buildSpans().firstChunk}</span>
                <span><mark>{this.buildSpans().highlightedChunk}</mark></span>
                <span>{this.buildSpans().lastChunk}</span>
            </div>
        )
    }

}

export default Highlighter;