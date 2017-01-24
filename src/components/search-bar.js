import React from "react";

export default class SearchBar extends React.Component{
    constructor(){
        super();
    
    
    this.state={
        value:''
    }
    }
    
    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }
    
    render(){
        
        return(
        <input
        className='search-bar'
        type="text"
        value={this.state.value}
        onChange={ (event) => this.handleChange(event) }
      />
      );
        
    }
}