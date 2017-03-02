import { connect } from 'react-redux';
import ContactList from '../components/ContactList/index';

const mapStateToProps = (state) => {
  return {
    searchText: state.contactList.searchText
    contactList: state.contactList.contacts.filter(
      // DON'T FORGET TO FILTER THIS SHIT
    )
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
