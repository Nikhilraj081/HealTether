import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';  // Example of your auth reducer

const rootReducer = combineReducers({
  auth: authReducer,  // Example reducer for managing authentication state
});

const store = createStore(rootReducer);

export default store;
