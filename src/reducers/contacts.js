import {combineReducers} from 'redux';
import {
  CREATE_CONTACT_ITEM,
  CREATE_CONTACT_LOADING_ERROR
} from '../actions/index';

function items(state = [], action) {
  if (action.type === CREATE_CONTACT_ITEM) {
    return action.contact;
  }
  return state;
}

function error(state = null, action) {
  if (action.type === CREATE_CONTACT_LOADING_ERROR) {
    return action.message;
  }
  return state;
}

const contacts = combineReducers({
  items,
  error
});

export default contacts;
