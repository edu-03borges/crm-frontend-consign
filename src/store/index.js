import configureStore, { history } from './configureStore';

const initialState = {};
const store = configureStore(initialState);

export { store, history };
