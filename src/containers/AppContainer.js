import { connect } from 'react-redux';
import App from '../App';
import {contactListLoad} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    contacts: state.contactList.contacts,
    error: state.contactList.message,
    isLoading: state.contactList.isLoading,
    searchText: state.contactList.searchText
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
)(App);
