import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Promotion } from "../../types/types";
import axios from "axios";

interface initialStateType {
    status : 'idle' | 'error' | 'loading' | 'success'
    error: string | null
    promotions: Promotion[]
}

const initialState: initialStateType = {
    status: "idle",
    error: null,
    promotions: []
}

export const fetchDataPromotion = createAsyncThunk('promotion/fetchData', async () => {
    const promotion = await axios.get(`${import.meta.env.VITE_API_URL}/promotions`)
    return promotion.data
})

const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataPromotion.fulfilled, (state, action) => {
            state.promotions = action.payload
            state.status = 'success'
        })
        builder.addCase(fetchDataPromotion.pending, (state) => {
            state.status = 'loading'
        })
    }
})

export const promotionReducer = promotionSlice.reducer
export const promotionAction = promotionSlice.actions