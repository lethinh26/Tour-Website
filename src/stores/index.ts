import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slides/userLoginRegister.slice";

const RootReducer = combineReducers({
    userReducer,
});

export const store = configureStore({
    reducer: RootReducer
});

export type StoreType = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;