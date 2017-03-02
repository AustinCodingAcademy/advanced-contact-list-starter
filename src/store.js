import { createStore } from 'redux';
import reducers from './reducers/index';
import {
  changeSearchText,
  createAlertMessage,
  toggleAlertWindow
} from './actions/index';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(createAlertMessage('Here\'s an alert message, cheese eater!'));

store.dispatch(changeSearchText('Test search text'));
store.dispatch(toggleAlertWindow());
store.dispatch(toggleAlertWindow());

export default store;
