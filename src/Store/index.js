import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './UserReducer';
import { saveState, loadState } from '../Utils/StateLoader';

const rootReducer = combineReducers({
  userStorage: userReducer,
});

const store = createStore(rootReducer, loadState(), composeWithDevTools());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
