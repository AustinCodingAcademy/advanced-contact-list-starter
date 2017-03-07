/**
 * Is loading state for contacts
 */
import {combineReducers} from 'redux';

import {
  CHANGE_SEARCH_TEXT,
  CREATE_CONTACT_LOADING_ERROR,
  CONTACT_LIST_LOAD_SUCCESS,
  CONTACT_LIST_LOAD,
  CONTACT_LIST_LOAD_ERROR
} from '../actions/index';

function isLoading(state = false, action) {
  if (action.type === CONTACT_LIST_LOAD_SUCCESS) {
    return false;
  }
  if (action.type === CONTACT_LIST_LOAD_ERROR) {
    return false;
  }
  if (action.type === CONTACT_LIST_LOAD) {
    return true;
  }
  return state;
}

function error(state = null, action) {
  if (action.type === CREATE_CONTACT_LOADING_ERROR) {
    return action.message;
  }
  console.log('Error reducer', action);
  return state;
}

function items(state = [], action) {
  if (action.type === CONTACT_LIST_LOAD_SUCCESS) {
    return action.items;
  }
  if (action.type === CONTACT_LIST_LOAD) {
    return [];
  }
  if (action.type === CONTACT_LIST_LOAD_ERROR) {
    return [];
  }
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
