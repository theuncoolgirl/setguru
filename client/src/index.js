import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { fetchSetlists } from '../../utils';

const token = window.localStorage.getItem('SETLIST_TOKEN');

const store = configureStore({ auth: { token } });

window.fetchSetlists = fetchSetlists;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;