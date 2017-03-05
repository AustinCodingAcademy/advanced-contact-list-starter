import {combineReducers} from 'redux';

function items(state = []) {
  return state;
}

const selectedContacts = combineReducers({
  items
});

export default selectedContacts;
