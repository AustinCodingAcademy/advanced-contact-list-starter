import { combineReducers } from 'redux';

function isLoading(state= false){
  return state;
}

function error (state = null) {
  return state;
}

function items(state=[]) {
  return state;
}

const contacts = combineReducers({
  isLoading,
  error,
  items
});

const contactList = combineReducers({
  contacts
})
