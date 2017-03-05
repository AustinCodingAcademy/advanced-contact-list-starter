import {createStore} from 'redux';
import reducers from './reducers/index';
import {
  createLoadingError,
  createActionHistoryLoadingError,
  createContactItem
} from './actions/index';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(createLoadingError('Contact loading error!'));

store.dispatch(createActionHistoryLoadingError('Action History loading error!'));

store.dispatch(createContactItem('contact'));
store.dispatch(createContactItem(['contact2', 'contact3']));

export default store;
