import axios from 'axios';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const CREATE_ALERT_MESSAGE = 'CREATE_ALERT_MESSAGE';
export const CONTACT_LIST_LOAD = 'CONTACT_LIST_LOAD';
export const CONTACT_LIST_LOAD_SUCCESS = 'CONTACT_LIST_LOAD_SUCCESS';
export const CONTACT_LIST_LOAD_ERROR = 'CONTACT_LIST_LOAD_ERROR';
export const CONTACT_LIST_ADD_CONTACT = 'CONTACT_LIST_ADD_CONTACT';
export const CONTACT_LIST_ADD_CONTACT_SUCCESS = 'CONTACT_LIST_ADD_CONTACT_SUCCESS';
export const CONTACT_LIST_ADD_CONTACT_ERROR = 'CONTACT_LIST_ADD_CONTACT_ERROR';
export const ACTION_HISTORY_ADD_ITEM = 'ACTION_HISTORY_ADD_ITEM';

/* eslint no-console: 0 */

export function contactListLoad() {
  return (dispatch) => {
    dispatch({
      type: CONTACT_LIST_LOAD
    });

    axios.get('/contacts')
      .then(response => {
        dispatch(contactListLoadSuccess(response.data));
      })
      .catch(() => {
        dispatch(contactListLoadError('Something went wrong!'));
      });

  };
}

export function contactListLoadSuccess(contacts) {
  return {
    type: CONTACT_LIST_LOAD_SUCCESS,
    contacts
  };
}

export function contactListLoadError(message) {
  return {
    type: CONTACT_LIST_LOAD_ERROR,
    message
  };
}

export function contactListAddContact(contact) {
  return (dispatch) => {
    dispatch({
      type: CONTACT_LIST_ADD_CONTACT,
      contact
    });

    axios.post('/contacts', contact)
      .then(response => {
        dispatch(contactListAddContactSuccess(response.data));
        dispatch(actionHistoryAddItem('add', response.data.name));
      })
      .catch(error => {
        dispatch(contactListAddContactError(error));
      });
  };
}

export function contactListAddContactSuccess(message) {
  return {
    type: CONTACT_LIST_ADD_CONTACT_SUCCESS,
    message
  };
}

export function contactListAddContactError(message) {
  return {
    type: CONTACT_LIST_ADD_CONTACT_ERROR,
    message
  };
}

export function actionHistoryAddItem(contactName) {
  return {
    type: ACTION_HISTORY_ADD_ITEM,
    contactName
  };
}

/**
 * Changes the input value of the search field
 */
export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  };
}

/**
 * Creates a message for the alert modal
 */
export function createAlertMessage(message) {
  return {
    type: CREATE_ALERT_MESSAGE,
    message
  };
}
