import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "./slides/tour.slide";
import { tourDetailReducer } from "./slides/tourDetail.slice";
import { tourTicketReducer } from "./slides/tourTicket.slice";
import { promotionReducer } from "./slides/promotion.slice";

const RootReducer = combineReducers({
    tourReducer,
    tourDetailReducer,
    tourTicketReducer,
    promotionReducer,
});

export const store = configureStore({
    reducer: RootReducer
});

export type StoreType = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;