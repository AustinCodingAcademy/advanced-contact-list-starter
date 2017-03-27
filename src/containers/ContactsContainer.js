import { connect } from 'react-redux';
import Contacts from '../Contacts';
import {
  contactListLoad,
  contactListAddContact
} from '../actions/index.js';

const mapStateToProps = (state) => {
  return {
    alertIsVisible: state.contactList.alertIsVisible,
    alertMessage: state.contactList.alertMessage,
    contacts: state.contactList.contacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContactsLoad: () => {
      dispatch(contactListLoad());
    },
    onAddContact: (contact) => {
      dispatch(contactListAddContact(contact));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
