import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/CounterReducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;