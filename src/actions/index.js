import axios from 'axios';

/**
* changes the search text
*/

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  };
}

/**
* loading the contact list
*/

export const CONTACT_LIST_LOAD = 'CONTACT_LIST_LOAD';
export const CONTACT_LIST_LOAD_SUCCESS = 'CONTACT_LIST_LOAD_SUCCESS';
export const CONTACT_LIST_LOAD_ERROR = 'CONTACT_LIST_LOAD_ERROR';

export function contactListLoad() {
  return (dispatch) => {
    axios.get('http://localhost:3001/contacts')
      .then(result => {
        dispatch(contactListLoadSuccess(result.data));
      })
      .catch(err => {
        dispatch(contactListLoadError(err));
      });
  };
}

export function contactListLoadError(message) {
  return {
    type: CONTACT_LIST_LOAD_ERROR,
    message
  };
}

export function contactListLoadSuccess(contacts) {
  return {
    type: CONTACT_LIST_LOAD_SUCCESS,
    contacts
  };
}
