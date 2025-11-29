import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "./slides/tour.slide";

const RootReducer = combineReducers({
    dataReducer : tourReducer
});

export const store = configureStore({
    reducer: RootReducer
});

export type StoreType = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;