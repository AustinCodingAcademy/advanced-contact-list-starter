/**
 * Is loading state for contacts
 */
import {combineReducers} from 'redux';

import {
  CHANGE_SEARCH_TEXT,
  CREATE_CONTACT_LOADING_ERROR
} from '../actions/index';

function isLoading(state = false) {
  return state;
}

function error(state = null, action) {
  if (action.type === CREATE_CONTACT_LOADING_ERROR) {
    return action.message;
  }
  console.log('Error reducer', action);
  return state;
}

function items(state = []) {
  return state;
}

const contacts = combineReducers({
  isLoading,
  error,
  items
});

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
  contacts,
  searchText,
  inputModalVisible
});
