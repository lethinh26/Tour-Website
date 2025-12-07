import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Tour, TourDeparture, TourImage } from "../../types/types";
import axios from "axios";

interface initialStateType {
    tour: Tour | null
    departures: TourDeparture[]
    images: TourImage[]
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}


const initialState : initialStateType = {
    tour: null,
    images: [],
    departures: [],
    status: 'idle',
    error: 'null'
}

export const fetchDataTicketTour = createAsyncThunk('data/fetchDataTicketTour', async (info: {id: number}) => {
    const {id: tourId} = info
    const data = [
        axios.get(`${import.meta.env.VITE_API_URL}/tours/${tourId}`),
        axios.get(`${import.meta.env.VITE_API_URL}/tourDepartures/${tourId}`),
        axios.get(`${import.meta.env.VITE_API_URL}/tourImages/${tourId}`)
    ]

    const  [tour, departures, images] = await Promise.all(data)
    return {
        tour: tour.data,
        departures: departures.data,
        images: images.data
    }
} )

const tourTicketSlice = createSlice({
    name: 'tourTicket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataTicketTour.fulfilled,(state, action) => {
            state.departures = action.payload.departures
            state.tour = action.payload.tour
            state.images= action.payload.images
            state.status = 'success'
        })
        builder.addCase(fetchDataTicketTour.pending, (state) => {
            state.status = 'loading'
        })
    }
})
 
export const tourTicketReducer = tourTicketSlice.reducer
export const tourTicketAction = tourTicketSlice.actions