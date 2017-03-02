export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const CREATE_ALERT_MESSAGE = 'CREATE_ALERT_MESSAGE';
export const TOGGLE_ALERT_WINDOW = 'TOGGLE_ALERT_WINDOW';

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

/**
 * Toggles the alert window
 */
export function toggleAlertWindow() {
  return {
    type: TOGGLE_ALERT_WINDOW
  };
}
