import React from 'react';
import ReactDOM from 'react-dom';
import './_i18n/i18n';
import App from './App';
import './styles/global-styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
