import {combineReducers} from 'redux';

function isLoading(state = false, action) {
  return state;
}

function error(state = null, action) {
  return state;
}

function items(state = [], action) {
  return state;
}

const contacts = combineReducers( {
  isLoading,
  error,
  items
});

const contactList = combineReducers( {
  contacts
});

const actionHistory = combineReducers( {
  items
});

const addedContacts = combineReducers( {
  contacts
});

const state = combineReducers( {
  contactList,
  addedContacts,
  actionHistory
});

export default state;
