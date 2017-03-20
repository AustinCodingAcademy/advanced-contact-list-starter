import { connect } from 'react-redux';
import App from '../App';
import { contactsLoading } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    contacts: state.contactList.contacts.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentMount: () => {
      dispatch(contactsLoading());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
