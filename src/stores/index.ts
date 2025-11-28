import { configureStore } from "@reduxjs/toolkit";

const RootReducer = {
    
};

export const store = configureStore({
    reducer: RootReducer
});

export type StoreType = ReturnType<typeof RootReducer>;