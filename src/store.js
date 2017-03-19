import {createStore} from 'redux';
import reducers from './reducers/index';
import {changeSearchText} from './actions/index';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(changeSearchText('new Text'));

export default store;
