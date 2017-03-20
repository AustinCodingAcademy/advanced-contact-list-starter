import { combineReducers } from 'redux';
import {
  CHANGE_SEARCH_TEXT,
  CREATE_ALERT_MESSAGE,
  CONTACT_LIST_LOAD,
  CONTACT_LIST_LOAD_SUCCESS,
  CONTACT_LIST_LOAD_ERROR
 } from '../actions/index';

function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCH_TEXT) {
    return action.text;
  }
  return state;
}

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

function alertMessage(state = '', action) {
  switch (action.type) {
    case CREATE_ALERT_MESSAGE:
    case CONTACT_LIST_LOAD_ERROR:
      return action.message;
  }
  return state;
}

function inputModalIsVisible(state = false) {
  return state;
}

function contacts(state = [], action) {
  switch (action.type) {
    case CONTACT_LIST_LOAD_SUCCESS:
      return action.contacts;
  }
  return state;
}

function selectedContacts(state = []) {
  return state;
}

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
