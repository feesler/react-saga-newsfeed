import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import newsFeedReducer from './newsFeedSlice';
import { requestNewsEpic } from '../epics';
import { configureStore } from '@reduxjs/toolkit';

const epic = combineEpics(
  requestNewsEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    newsFeed: newsFeedReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(epic);

export default store;
