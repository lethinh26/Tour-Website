import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Category, Tour, TourDeparture, TourImage } from "../../types/types";
import axios from "axios";

interface TourState {
    tours: Tour[]
    categories: Category[]
    images: TourImage[]
    departures: TourDeparture[]
    status: 'success' | 'failed' | 'loading' | 'idle',
    error: string | null
}
const initialState: TourState = {
    tours: [],
    categories: [],
    images: [],
    departures: [],
    status: 'idle',
    error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {

    const data = [
        axios.get('http://localhost:3000/api/tours'),
        axios.get('http://localhost:3000/api/tourImages'),
        axios.get('http://localhost:3000/api/categories'),
    ]

    const [tours, tourImage, categories] = await Promise.all(data)
    return {
        tours: tours.data,
        tourImage: tourImage.data,
        categories: categories.data
    }
})

const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { tours, tourImage, categories } = action.payload
            state.images = tourImage
            state.tours = tours
            state.categories = categories
            state.status = 'success'
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message || 'fetch api failed'
        })
    }
})

export const tourReducer = tourSlice.reducer
export const tourAction = tourSlice.actions