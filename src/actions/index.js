
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';


export const CREATE_CONTACT_LOADING_ERROR = 'CREATE_CONTACT_LOADING_ERROR';

export function createLoadingError(message) {
  return {
    type: CREATE_CONTACT_LOADING_ERROR,
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
