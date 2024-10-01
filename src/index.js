import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './styles/index.css'
import {BrowserRouter} from "react-router-dom";
import store from './redux/store';
import {Provider} from 'react-redux';


const rootView = document.getElementById('root');


if (rootView) {
  ReactDOM.render(
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>,
    rootView
  )
}
