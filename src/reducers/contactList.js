import { combineReducers } from 'redux';
import {
  CHANGE_SEARCH_TEXT,
  CREATE_ALERT_MESSAGE,
  TOGGLE_ALERT_WINDOW
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
    case TOGGLE_ALERT_WINDOW:
      return !state;
  }
  return state;
}

/**
 *  Message inside the alert window
 */
function alertMessage(state = '', action) {
  switch (action.type) {
    case CREATE_ALERT_MESSAGE:
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
function contacts(state = []) {
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
