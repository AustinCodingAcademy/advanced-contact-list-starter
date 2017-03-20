import {combineReducers} from 'redux';
import {
  CHANGE_SEARCH_TEXT,
  CONTACTS_LOADING,
  CONTACTS_LOAD_SUCCESS,
  CONTACTS_LOAD_ERROR
} from '../actions';

function isLoading(state = false, action) {
  switch (action.type) {
    case CONTACTS_LOADING:
      return true;
    case CONTACTS_LOAD_SUCCESS:
      return false;
    case CONTACTS_LOAD_ERROR:
      return false;
  }
  return state;
}

function error(state = null, action) {
  if (action.type === CONTACTS_LOAD_ERROR) {
    return action.message;
  }
  return state;
}

function items(state = [], action) {
  switch (action.type) {
    case CONTACTS_LOADING:
      return [];
    case CONTACTS_LOAD_ERROR:
      return [];
    case CONTACTS_LOAD_SUCCESS:
      return action.items;
  }
  return state;
}

const contacts = combineReducers( {
  isLoading,
  error,
  items
});

const addedContacts = combineReducers( {
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

const actionHistory = combineReducers( {
  items
});

export default combineReducers( {
  searchText,
  contacts,
  addedContacts,
  actionHistory
});
