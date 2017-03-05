export const CHANGE_SEARCHTEXT = 'CHANGE_SEARCHTEXT';

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCHTEXT,
    text
  };
}

export const CREATE_CONTACT_LOADING_ERROR = 'CREATE_CONTACT_LOADING_ERROR';

export function createLoadingError(message) {
  return {
    type: CREATE_CONTACT_LOADING_ERROR,
    message
  };
}

export const CREATE_ACTIONHISTORY_LOADING_ERROR = 'CREATE_ACTIONHISTORY_LOADING_ERROR';

export function createActionHistoryLoadingError(message) {
  return {
    type: CREATE_ACTIONHISTORY_LOADING_ERROR,
    message
  };
}

export const CREATE_CONTACT_ITEM = 'CREATE_CONTACT_ITEM';

export function createContactItem(contact) {
  return {
    type: CREATE_CONTACT_ITEM,
    contact
  };
}
