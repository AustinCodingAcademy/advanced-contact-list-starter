
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

/**
 * Changes the input value of the search field
 */
export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  };
}
