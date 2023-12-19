import { asyncThunkCreator, combineReducers, configureStore } from '@reduxjs/toolkit'
// import PreloginReducer, { preloginSelector } from '../slices/preloginSlice'
import PreloginReducer from './slices/preLoginSlice'
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import  {thunk }from 'redux-thunk';
const rootReducer = combineReducers({ 
    preloginSelector:PreloginReducer,
    //notes: notesReducer
  })
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['preloginSelector']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    thunk: {
     
    }
  })
})
export const persistor = persistStore(store)