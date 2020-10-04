import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import RootNav from './navigation/RootNav';
import { loadStocks } from './actions/stockActions';

const store = createStore(AuthReducer, applyMiddleware(thunk));

store.dispatch(loadStocks());

export default function App() {
  return (
    <Provider store={store}>
      <RootNav />
    </Provider>
  );
}
