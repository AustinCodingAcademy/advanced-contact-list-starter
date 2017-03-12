import {combineReducers} from 'redux';

function items(state = []) {
  return state;
}

function isLoading(state = false) {
  return state;
}

function errorMessage(state = null) {
  return state;
}

const selectedContacts = combineReducers({
  items,
  isLoading,
  errorMessage
});

export default selectedContacts;
