import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import auth from './auth';

const reducer = combineReducers({
  customization: customizationReducer,
  auth,
});

export default reducer;
