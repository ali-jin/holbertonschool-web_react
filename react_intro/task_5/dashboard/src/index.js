import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Notifications from './Notifications/Notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="root-notifications">
      <Notifications />
    </div>
    <div className="root">
      <App />
    </div>
  </React.StrictMode>
);
ReactDOM.render(<App />, document.getElementById('root'));
