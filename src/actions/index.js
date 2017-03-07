
import axios from 'axios';

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

export const CONTACT_LIST_LOAD = 'CONTACT_LIST_LOAD';
export const CONTACT_LIST_LOAD_SUCCESS = 'CONTACT_LIST_LOAD_SUCCESS';
export const CONTACT_LIST_LOAD_ERROR = 'CONTACT_LIST_LOAD_ERROR';


export function contactListLoad() {
  return (dispatch) => {
    // contactlistLoad
    axios.get('http://localhost:3001/contacts')
      .then((result) => {
        dispatch(contactListLoadSuccess(result.data));
      }).catch(() => {
        dispatch(contactListLoadError('Something went wrong'));
      });

    dispatch({
      type: CONTACT_LIST_LOAD
    });
  };
}

export function contactListLoadSuccess(items) {
  return {
    type: CONTACT_LIST_LOAD_SUCCESS,
    items
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
