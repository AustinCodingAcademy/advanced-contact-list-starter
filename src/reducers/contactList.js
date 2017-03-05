import {combineReducers} from 'redux';
import contacts from './contacts';
import selectedContacts from './selectedContacts';
import actionHistory from './actionHistory';
import contactForm from './contactForm';
import {CHANGE_SEARCHTEXT} from '../actions/index';

function searchText(state = '', action) {
  if (action.type === CHANGE_SEARCHTEXT) {
    return action.text;
  }
  return state;
}

const contactList = combineReducers({
  searchText,
  contacts,
  selectedContacts,
  actionHistory,
  contactForm
});

export default contactList;
