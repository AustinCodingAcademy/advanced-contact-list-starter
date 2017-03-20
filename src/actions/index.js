// export function searchBarChange(text) {
//   console.log('The text is ' + text.words);
// }
export const ACTION_MESSAGE = 'ACTION_MESSAGE';

export function actionMessage(text) {
  return {
    type: ACTION_MESSAGE,
    payload: text
  };
}

export const SEARCH_TEXT = 'SEARCH_TEXT';

export function searchText(text) {
  return {
    type: SEARCH_TEXT,
    payload: text
  };
}
