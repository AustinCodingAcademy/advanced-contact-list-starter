import {combineReducers} from 'redux';
import {
  CHANGE_SEARCH_TEXT
} from '../actions/index';

function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCH_TEXT) {
    return action.text;
  }
  return state;
}

function contacts(state = []) {
  return state;
}

function selectedContacts(state = []) {
  return state;
}

function actionHistory(state = []) {
  return state;
}

function originalState(state = {}) {
  return state;
}

export default combineReducers({
  searchText,
  contacts,
  selectedContacts,
  actionHistory,
  originalState
});
