/**
 * Is loading state for contacts
 */
import {combineReducers} from 'redux';

import {CHANGE_SEARCH_TEXT} from '../actions/index';

function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCH_TEXT) {
    return action.text;
  }
  return state;
}

function inputModalVisible(state = false) {
  return state;
}

export default combineReducers({
  searchText,
  inputModalVisible
});
