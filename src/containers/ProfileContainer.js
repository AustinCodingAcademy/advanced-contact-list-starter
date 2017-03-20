/* eslint-disable no-console */

import { connect } from 'react-redux';
import Profile from '../components/Profile/index';
import { contactListLoad } from '../actions/index.js';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.id);
  console.log(state);
  return {
    contact: state.contactList.contacts.filter(contact => {
      return contact._id === ownProps.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContactsLoad: () => {
      dispatch(contactListLoad());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
