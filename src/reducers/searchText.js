import { SEARCH_TEXT } from '../actions/index';

export function searchText(state = null, action) {
  if (action.type === SEARCH_TEXT) {
    return action.payload;
  }
  return state;
}

// const searchText = combineReducers({searchText})
