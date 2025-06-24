import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import theme from './theme/theme';
import { store } from './app/store';
import {Provider} from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <Provider store = {store} >
          <App />
          <ToastContainer position = 'top-right' autoClose={1500} closeOnClick/>
      </Provider>

    </ThemeProvider>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
