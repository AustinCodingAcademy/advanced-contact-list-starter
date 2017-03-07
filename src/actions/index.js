import axios from 'axios';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const CREATE_ALERT_MESSAGE = 'CREATE_ALERT_MESSAGE';
export const CONTACT_LIST_LOAD = 'CONTACT_LIST_LOAD';
export const CONTACT_LIST_LOAD_SUCCESS = 'CONTACT_LIST_LOAD_SUCCESS';
export const CONTACT_LIST_LOAD_ERROR = 'CONTACT_LIST_LOAD_ERROR';

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
