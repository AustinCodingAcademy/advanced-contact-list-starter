
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

export function changeSearchText(text) {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  };
}
