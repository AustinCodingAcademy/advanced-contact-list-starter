import axios from 'axios';

export const CHANGE_SEARCHTEXT = 'CHANGE_SEARCHTEXT';

export const CONTACTLIST_LOAD_START = 'CONTACTLIST_LOAD_START';
export const CONTACTLIST_LOAD_SUCCESS = 'CONTACTLIST_LOAD_SUCCESS';
export const CONTACTLIST_LOAD_ERROR = 'CONTACTLIST_LOAD_ERROR';

export const SELECTEDCONTACTS_LOAD_START = 'SELECTEDCONTACTS_LOAD_START';
export const SELECTEDCONTACTS_LOAD_SUCCESS = 'SELECTEDCONTACTS_LOAD_SUCCESS';
export const SELECTEDCONTACTS_LOAD_ERROR = 'SELECTEDCONTACTS_LOAD_ERROR';

export const ACTIONHISTORY_LOAD_START = 'ACTIONHISTORY_LOAD_START';
export const ACTIONHISTORY_LOAD_SUCCESS = 'ACTIONHISTORY_LOAD_SUCCESS';
export const ACTIONHISTORY_LOAD_ERROR = 'ACTIONHISTORY_LOAD_ERROR';

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCHTEXT,
    text
  };
}

export function contactListLoadStart() {
  return (dispatch) => {
    axios.get('http://localhost:3001/contacts')
      .then(response => {
        dispatch(contactListLoadSuccess(response.data));
      })
      .catch(error => {
        dispatch(contactListLoadError(error));
      });

    dispatch({
      type: CONTACTLIST_LOAD_START
    });
  };
}

export function contactListLoadSuccess(items) {
  return {
    type: CONTACTLIST_LOAD_SUCCESS,
    items
  };
}

export function contactListLoadError(message) {
  return {
    type: CONTACTLIST_LOAD_ERROR,
    message
  };
}

export function selectedContactsLoadStart() {
  
}

export function selectedContactsLoadSuccess(items) {
  return {
    type: SELECTEDCONTACTS_LOAD_START,
    items
  };
}

export function selectedContactsLoadError(message) {
  return {
    type: SELECTEDCONTACTS_LOAD_ERROR,
    message
  };
}

export function actionHistoryLoadStart() {
  return (dispatch) => {
    axios.get('http://localhost:3001/actionhistory')
      .then(response => {
        response.data.sort((a, b) => {
          const idA = a._id;
          const idB = b._id;
          if (idA > idB) {
            return -1;
          }
          if (idA < idB) {
            return 1;
          }
          return 0;
        });
        if (response.data.length > 10) {
          response.data = response.data.slice(0, 10);
        }
        dispatch(actionHistoryLoadSuccess(response.data));
      })
      .catch(error => {
        alert('ACTION HISTORY ERROR!');
        dispatch(actionHistoryLoadError(error));
      });
  };
}

export function actionHistoryLoadSuccess(items) {
  return {
    type: ACTIONHISTORY_LOAD_SUCCESS,
    items
  };
}

export function actionHistoryLoadError(message) {
  return {
    type: ACTIONHISTORY_LOAD_ERROR,
    message
  };
}
