import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      contact: null
    };
  }
  componentDidMout() {
    axios.get(`/contacts/${this.props.match.params.id}`)
    .then(resp => {
      this.setState({
        contact: resp.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  renderProfile() {
    return (
      <div className="profile">
        <div className="image-cropper">
          <img src={this.state.contact.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>Name: {this.sate.contact.name}</h2>
          <span>Occupation: {this.state.contact.occupation} </span>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.contact) {
      return (<h2> loading </h2>);
    }
    return this.renderProfile();
  }


}
export default Profile;
