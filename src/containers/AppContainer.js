import { connect } from 'react-redux';
import App from '../App';
import {contactListLoadStart} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    items: state.contactList.contacts.items,
    errorMessage: state.contactList.contacts.errorMessage,
    isLoading: state.contactList.contacts.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContactListLoad: () => {
      dispatch(contactListLoadStart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
