import { combineReducers } from 'redux';
import { contacts } from './contacts';
import { searchText } from './searchText';
import { selectedContacts } from './selectedContacts';
import { actionMessage } from './actionMessage';

const rootReducer = combineReducers({
  actionMessage,
  contacts,
  searchText,
  selectedContacts
  // state: (state = {}) => state
});

export default rootReducer;
