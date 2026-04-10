import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // The "Bridge"
import store from './store'; // The "Brain"
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App makes the store accessible everywhere */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);