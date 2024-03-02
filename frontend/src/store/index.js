import newsFeedReducer from './newsFeedSlice';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        newsFeed: newsFeedReducer,
    },
    middleware: () => (
        [sagaMiddleware]
    ),
});

sagaMiddleware.run(saga);

export default store;
