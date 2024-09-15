import { configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './components/auth/authSlice'; 
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'auth',
  storage,
  transforms: [
    encryptTransform({
      secretKey: '3x@mpl3S3crK3y123!',
      onError: function (error) {
        console.log('error', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});



export const persistor = persistStore(store);
