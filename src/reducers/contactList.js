import { combineReducers } from 'redux';
import {
  CHANGE_SEARCH_TEXT,
  CREATE_ALERT_MESSAGE,
  CONTACT_LIST_LOAD,
  CONTACT_LIST_LOAD_SUCCESS,
  CONTACT_LIST_LOAD_ERROR
 } from '../actions/index';

/**
 *  Text inside search bar
 */
function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCH_TEXT) {
    return action.text;
  }
  return state;
}

/**
 *  Is alert window visible?
 */
function alertIsVisible(state = false, action) {
  switch (action.type) {
    case CONTACT_LIST_LOAD:
      return true;
    case CONTACT_LIST_LOAD_SUCCESS:
    case CONTACT_LIST_LOAD_ERROR:
      return false;
  }
  return state;
}

/**
 *  Message inside the alert window
 */
function alertMessage(state = '', action) {
  switch (action.type) {
    case CREATE_ALERT_MESSAGE:
    case CONTACT_LIST_LOAD_ERROR:
      return action.message;
  }
  return state;
}

/**
 *  Is the input modal visible?
 */
function inputModalIsVisible(state = false) {
  return state;
}

/**
 *  List of contacts
 */
function contacts(state = [], action) {
  switch (action.type) {
    case CONTACT_LIST_LOAD_SUCCESS:
      return action.contacts;
  }
  return state;
}

/**
 *  List of contacts which have been selected by user
 */
function selectedContacts(state = []) {
  return state;
}

/**
 *  List of actions performed by user (selected contact, added
 *  contact, etc)
 */
function actionHistory(state = []) {
  return state;
}

export default combineReducers({
  searchText,
  alertIsVisible,
  alertMessage,
  inputModalIsVisible,
  contacts,
  selectedContacts,
  actionHistory
});
