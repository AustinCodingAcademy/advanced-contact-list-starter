import {combineReducers} from 'redux';
import {CREATE_ACTIONHISTORY_LOADING_ERROR} from '../actions/index';

function items(state = []) {
  return state;
}

function error(state = null, action) {
  if (action.type === CREATE_ACTIONHISTORY_LOADING_ERROR) {
    return action.message;
  }
  return state;
}

const actionHistory = combineReducers({
  items,
  error
});

export default actionHistory;
