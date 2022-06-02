import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { cardsPersistConfig, cardsReducer } from './cards';

const persistedReducersObject = {
  cards: persistReducer(cardsPersistConfig, cardsReducer),
};

const rootPersistConfig = {
  /*
    Put all substores to blacklist, so their local persist config won't conflict with the global one
    and the local persist configs would be the only source of truth for every duck
  */
  blacklist: Object.keys(persistedReducersObject),
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers(persistedReducersObject);

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: persistedRootReducer,
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { AppDispatch, RootState };
export { persistor, store };
