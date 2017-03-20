import axios from 'axios';
// contact list actions
// is loading, load success, load error
export const CONTACTS_LOADING = 'CONTACTS_LOADING';

export function contactsLoading() {
  return (dispatch) => {
    // request triggers Loading
    axios.get('http://localhost:3001/contacts')
      .then((result) => {
        dispatch(contactsLoadSuccess(result.data));
      }).catch(() => {
        dispatch(contactsLoadError('could not load contacts'));
      });

    dispatch({
      type: CONTACTS_LOADING
    });
  };
}

export const CONTACTS_LOAD_SUCCESS = 'CONTACTS_LOAD_SUCCESS';

export function contactsLoadSuccess(items) {
  return {
    type: CONTACTS_LOAD_SUCCESS,
    items
  };
}

export const CONTACTS_LOAD_ERROR = 'CONTACTS_LOAD_ERROR';

export function contactsLoadError(err) {
  return {
    type: CONTACTS_LOAD_ERROR,
    err
  };
}

// search text change action
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  };
}
