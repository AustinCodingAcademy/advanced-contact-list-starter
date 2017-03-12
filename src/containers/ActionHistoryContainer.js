import {connect} from 'react-redux';
import ActionHistoryList from '../components/ActionHistoryList/ActionHistoryList';
import {
  actionHistoryLoadStart,
  actionHistoryLoadSuccess,
  actionHistoryLoadError
} from '../actions/index';

const mapStateToProps = state => {
  return {
    items: state.contactList.actionHistory.items,
    isLoading: state.contactList.actionHistory.isLoading,
    error: state.contactList.actionHistory.error
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
)(ActionHistoryList);
