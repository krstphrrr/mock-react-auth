import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
// import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React>
    <Auth0Provider
      domain="dev-mg6fdv6o.auth0.com"
      clientId="4xXgQ0eXJRefhenfBYuWECatmv46oiJL"
      redirectUri={window.location.origin}
      // for api communication:
      audience= 'http://localhost:5001'
      scope='openid profile email read:current_user'
  >
    <App />
  </Auth0Provider>,
  // </React>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
