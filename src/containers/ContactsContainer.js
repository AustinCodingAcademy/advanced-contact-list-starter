import { connect } from 'react-redux';
import Contacts from '../Contacts';
import { contactListLoad } from '../actions/index.js';

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
