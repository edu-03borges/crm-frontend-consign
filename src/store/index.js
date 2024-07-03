import storage from 'redux-persist/lib/storage'; 
import { createStore } from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persister = persistStore(store);

export { store, persister };
