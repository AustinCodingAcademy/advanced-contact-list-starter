import {combineReducers} from 'redux';

function name(state = '') {
  return state;
}

function occupation(state = '') {
  return state;
}

function avatar(state = '') {
  return state;
}

const contactForm = combineReducers({
  name,
  occupation,
  avatar
});

export default contactForm;
