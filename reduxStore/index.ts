import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import signupReducer from "./slices/user/signupSlice";
import { getDefaultConfig } from "@react-native/metro-config";

//Only reducers available in whitelist are stored in Async
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "signup",
  ],
};

// All the reducers from all the slices are declared in this rootReducer
const rootReducer = combineReducers({
    signup: signupReducer,
})

// Persist configuration before storing
const persistedReducer = persistReducer(persistConfig, rootReducer);

//finally the store is created 
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: false,
        })
})

export const persistor = persistStore(store);

// Infer the 'Rootstate' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostState, comments: CommentsState, users: UsersStae}
export type AppDispatch = typeof store.dispatch