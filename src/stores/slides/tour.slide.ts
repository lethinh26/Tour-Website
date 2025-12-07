import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Category, Location, Tour, TourDeparture, TourImage } from "../../types/types";
import axios from "axios";

interface TourState {
    tours: Tour[]
    categories: Category[]
    images: TourImage[]
    departures: TourDeparture[]
    locations: Location[]
    status: 'success' | 'failed' | 'loading' | 'idle',
    error: string | null
}
const initialState: TourState = {
    tours: [],
    categories: [],
    images: [],
    departures: [],
    locations: [],
    status: 'idle',
    error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const data = [
        axios.get(`${import.meta.env.VITE_API_URL}/tours`),
        axios.get(`${import.meta.env.VITE_API_URL}/tourImages`),
        axios.get(`${import.meta.env.VITE_API_URL}/categories`),
        axios.get(`${import.meta.env.VITE_API_URL}/tourDepartures`),
        axios.get(`${import.meta.env.VITE_API_URL}/locations`)
    ]

    const [tours, tourImage, categories, departures, locations] = await Promise.all(data)
    return {
        tours: tours.data,
        tourImage: tourImage.data,
        categories: categories.data,
        departures: departures.data,
        locations: locations.data
    }
})

const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            
            const { tours, tourImage, categories, departures, locations } = action.payload
            state.images = tourImage
            state.tours = tours
            state.categories = categories
            state.departures = departures
            state.locations = locations
            state.status = 'success'
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            
            state.status = "failed"
            state.error = action.error.message || 'fetch api failed'
        })
        builder.addCase(fetchData.pending, (state) => {
            state.status = 'loading'
        })
    }
})

export const tourReducer = tourSlice.reducer
export const tourAction = tourSlice.actions