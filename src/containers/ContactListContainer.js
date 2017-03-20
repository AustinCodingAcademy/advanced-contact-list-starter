import { connect } from 'react-redux';
import ContactList from '../ContactList/index';
import { addContact } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    value: state.contactList.searchText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: value => {
      dispatch(addContact(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
