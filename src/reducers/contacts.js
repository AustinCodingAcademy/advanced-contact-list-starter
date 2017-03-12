import {combineReducers} from 'redux';
import {
  CONTACTLIST_LOAD_START,
  CONTACTLIST_LOAD_SUCCESS,
  CONTACTLIST_LOAD_ERROR
} from '../actions/index';

function isLoading(state = false, action) {
  if (action.type === CONTACTLIST_LOAD_START) {
    return true;
  }
  if (action.type === CONTACTLIST_LOAD_SUCCESS) {
    return false;
  }
  if (action.type === CONTACTLIST_LOAD_ERROR) {
    return false;
  }
  return state;
}

function errorMessage(state = null, action) {
  if (action.type === CONTACTLIST_LOAD_ERROR) {
    return action.message;
  }
  if (action.type === CONTACTLIST_LOAD_SUCCESS) {
    return null;
  }
  if (action.type === CONTACTLIST_LOAD_START) {
    return null;
  }
  return state;
}

function items(state = [], action) {
  if (action.type === CONTACTLIST_LOAD_SUCCESS) {
    return action.items;
  }
  if (action.type === CONTACTLIST_LOAD_START) {
    return [];
  }
  if (action.type === CONTACTLIST_LOAD_ERROR) {
    return [];
  }
  return state;
}

const contacts = combineReducers({
  items,
  isLoading,
  errorMessage
});

export default contacts;
