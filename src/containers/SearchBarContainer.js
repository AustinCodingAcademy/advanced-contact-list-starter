import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar/SearchBar';
import {changeSearchText} from '../actions/index';

const mapStateToProps = state => {
  return {
    value: state.contactList.searchText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: value => {
      dispatch(changeSearchText(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
