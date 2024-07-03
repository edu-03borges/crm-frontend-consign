import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store, persister } from 'store';

import 'assets/scss/style.scss';
import config from './config';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>
);

serviceWorker.unregister();
