/**
 * Created by brianmichael on 1/23/17.
 */
import React, { Component } from 'react';

class Contact extends Component {



    render() {
        return (
            <li
                className="contact"
            >
                <div className="image-cropper">
                    <img src={this.props.avatar} alt="avatar"/>
                </div>
                <div className="contact-info">
                    <h2>{this.props.name}</h2>
                    {this.props.occupation}
                </div>
                <button
                    className="select-button"
                    id={this.props.id}
                    onClick={(event) => this.props.handleSelectContactClick(event)}>Select
                </button>
            </li>
        );
    }
}

export default Contact;