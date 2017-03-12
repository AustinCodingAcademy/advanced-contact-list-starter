import {combineReducers} from 'redux';
import {
  CHANGE_SEARCH_TEXT,
  CONTACT_LIST_LOAD_SUCCESS,
  CONTACT_LIST_LOAD_ERROR,
  CONTACT_LIST_LOAD
} from '../actions/index';

function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCH_TEXT) {
    return action.text;
  }
  return state;
}

function isLoading(state = false, action) {
  if (action.type === CONTACT_LIST_LOAD_SUCCESS) {
    return false;
  }
  if (action.type === CONTACT_LIST_LOAD) {
    return true;
  }
  if (action.type === CONTACT_LIST_LOAD_ERROR) {
    return false;
  }
  return state;
}

function contacts(state = [], action) {
  if (action.type === CONTACT_LIST_LOAD_SUCCESS) {
    return action.contacts;
  }
  if (action.type === CONTACT_LIST_LOAD) {
    return [];
  }
  if (action.type === CONTACT_LIST_LOAD_ERROR) {
    return [];
  }
  return state;
}

function selectedContacts(state = []) {
  return state;
}

function actionHistory(state = []) {
  return state;
}

function originalState(state = {}, action) {
  if (action.type === CONTACT_LIST_LOAD_SUCCESS) {
    return {
      searchText: '',
      contacts: action.data,
      selectedContacts: []
    };
  }
  return state;
}

export default combineReducers({
  searchText,
  contacts,
  selectedContacts,
  actionHistory,
  originalState,
  isLoading
});
