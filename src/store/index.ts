import { configureStore } from "@reduxjs/toolkit";
import reducers from "./slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true, //to get useful logging
};

const pReducers = persistReducer(config, reducers);

export const store = configureStore({
  reducer: pReducers,
  middleware: (getDefaultMiddleware: any) => {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "test"
    ) {
      const { logger } = require(`redux-logger`);
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger);
    } else {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    }
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
