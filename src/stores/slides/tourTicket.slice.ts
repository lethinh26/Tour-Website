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
        axios.get(`http://localhost:3000/api/tours/${tourId}`),
        axios.get(`http://localhost:3000/api/tourDepartures/${tourId}`),
        axios.get(`http://localhost:3000/api/tourImages/${tourId}`)
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