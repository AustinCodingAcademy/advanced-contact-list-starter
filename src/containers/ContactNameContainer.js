import { connect } from 'react-redux';
import ContactName from '../components/ContactName';

const mapStateToProps = (state) => {
  return {
    searchText: state.contactList.searchText
  };
};

export default connect(
  mapStateToProps
)(ContactName);
