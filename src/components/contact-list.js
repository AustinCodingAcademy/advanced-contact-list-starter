import React from "react";
import Contact from "./contact.js";

export default class ContactList extends React.Component{
    render(){
        
        let contactsObj = this.props.data;
        
        return(
            <ul className="contact-list">
                {contactsObj.contacts.map((contact,i) => {
                    return (<Contact {...contact} key={i}/>)})}
            </ul>
        );
        
    }
}