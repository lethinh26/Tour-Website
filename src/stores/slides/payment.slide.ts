import { createSlice } from "@reduxjs/toolkit";

interface PaymentState {
    
}

const initialState: PaymentState = {

};

const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {
    }
})

export const paymentReducer = paymentSlice.reducer
export const paymentAction = paymentSlice.actions