import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import customizationReducer from './customizationReducer';
import auth from './auth';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  customization: customizationReducer,
  auth,
});

export default createRootReducer;
