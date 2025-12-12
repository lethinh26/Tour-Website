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
    try {
        const promotion = await axios.get(`${import.meta.env.VITE_API_URL}/promotions`)
        return Array.isArray(promotion.data) ? promotion.data : []
    } catch (error) {
        console.error('Error fetching promotions:', error);
        return []
    }
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
        builder.addCase(fetchDataPromotion.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'Failed to fetch promotions'
            state.promotions = []
        })
    }
})

export const promotionReducer = promotionSlice.reducer
export const promotionAction = promotionSlice.actions