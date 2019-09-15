import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools())
ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

