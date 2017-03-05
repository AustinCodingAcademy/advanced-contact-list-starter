import { connect } from 'react-redux';
import ContactList from '../components/ContactList/index';

const mapStateToProps = (state) => {
  console.log('Inside ContactListContainer');
  console.log(state);
  return {
    searchText: state.contactList.searchText,
    contacts: state.contactList.contacts.filter(contact => {
      const term = state.contactList.searchText.trim().toLowerCase();
      return contact.name.toLowerCase().indexOf(term) >= 0;
    })
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChange: value => {
//       dispatch(changeSearchText(value));
//     }
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ContactList);
