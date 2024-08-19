import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './features/user/userSlice';

import userReducerselected from './features/user/userSliceselected';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const persistedReducerselected = persistReducer(persistConfig, userReducerselected);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    userselected: persistedReducerselected,
  },
});

export const persistor = persistStore(store);

export default store;
