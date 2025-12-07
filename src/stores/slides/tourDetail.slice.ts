import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Tour, TourDeparture, TourImage } from "../../types/types";
import axios from "axios";

interface TourDetailState {
    tour: Tour | null,
    images: TourImage[],
    departure: TourDeparture | null,
    status: 'success' | 'failed' | 'loading' | 'idle',
    error: string | null
}

const initialState : TourDetailState = {
    tour: null,
    images: [],
    departure : null,
    status: 'idle',
    error: null
}

export const fetchDataTourDetail = createAsyncThunk('dataTourDetail/getData', async (tourId: number) => {
    // const {tourId} = info

    const data = [
        axios.get(`${import.meta.env.VITE_API_URL}/tours/${tourId}`), // tour
        axios.get(`${import.meta.env.VITE_API_URL}/tourImages/${tourId}`), // images
        axios.get(`${import.meta.env.VITE_API_URL}/tourDepartures/${tourId}`), // departures
    ]

    const [tour, tourImages, departure] = await Promise.all(data)
    return {
        tour : tour.data, 
        images: tourImages.data, 
        departures: departure.data,
    }
})

const tourDetailSlice = createSlice({
    name: 'tourDetail',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataTourDetail.fulfilled, (state, action) => {
            const { tour, departures, images} = action.payload
            state.tour = tour
            state.departure = departures
            state.images = images
            state.status = 'success'
        })
        builder.addCase(fetchDataTourDetail.pending, (state) => {
            state.status = 'loading'
        })
    }
})

export const tourDetailReducer = tourDetailSlice.reducer
export const tourDetailAction = tourDetailSlice.actions
