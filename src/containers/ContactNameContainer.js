import { connect } from 'react-redux';
import ContactName from '../components/ContactName';
// import {changeSearchText} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    value: state.contactList.searchText
  };
};

export default connect(
  mapStateToProps
)(ContactName);
