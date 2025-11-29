import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "./slides/tour.slide";

const RootReducer = {
    dataReducer : tourReducer
};

export const store = configureStore({
    reducer: RootReducer
});

export type StoreType = ReturnType<typeof RootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;