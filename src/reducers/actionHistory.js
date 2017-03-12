import {combineReducers} from 'redux';
import {
  ACTIONHISTORY_LOAD_START,
  ACTIONHISTORY_LOAD_SUCCESS,
  ACTIONHISTORY_LOAD_ERROR
} from '../actions/index';

function items(state = [], action) {
  if (action.type === ACTIONHISTORY_LOAD_SUCCESS) {
    return action.items;
  }
  if (action.type === ACTIONHISTORY_LOAD_START) {
    return [];
  }
  if (action.type === ACTIONHISTORY_LOAD_ERROR) {
    return [];
  }
  return state;
}

function isLoading(state = false, action) {
  if (action.type === ACTIONHISTORY_LOAD_START) {
    return true;
  }
  if (action.type === ACTIONHISTORY_LOAD_SUCCESS) {
    return false;
  }
  if (action.type === ACTIONHISTORY_LOAD_ERROR) {
    return false;
  }
  return state;
}

function errorMessage(state = null, action) {
  if (action.type === ACTIONHISTORY_LOAD_ERROR) {
    return action.message;
  }
  if (action.type === ACTIONHISTORY_LOAD_START) {
    return null;
  }
  if (action.type === ACTIONHISTORY_LOAD_SUCCESS) {
    return null;
  }
  return state;
}

const actionHistory = combineReducers({
  items,
  isLoading,
  errorMessage
});

export default actionHistory;
