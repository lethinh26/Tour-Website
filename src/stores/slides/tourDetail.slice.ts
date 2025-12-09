import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Tour, TourDeparture, TourImage } from "../../types/types";
import axios from "axios";

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface TourDetailState {
    tour: Tour | null,
    images: TourImage[],
    departure: TourDeparture | null,
    reviews: Review[],
    averageRating: number,
    totalReviews: number,
    status: 'success' | 'failed' | 'loading' | 'idle',
    error: string | null
}

const initialState : TourDetailState = {
    tour: null,
    images: [],
    departure : null,
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
    status: 'idle',
    error: null
}

export const fetchDataTourDetail = createAsyncThunk('dataTourDetail/getData', async (tourId: number) => {
    try {
        const data = [
            axios.get(`${import.meta.env.VITE_API_URL}/tours/${tourId}`), // tour
            axios.get(`${import.meta.env.VITE_API_URL}/tourImages/${tourId}`), // images
            axios.get(`${import.meta.env.VITE_API_URL}/tourDepartures/tour/${tourId}`), // departures
            axios.get(`${import.meta.env.VITE_API_URL}/tours/reviews/tour/${tourId}`), // reviews
        ]

        const [tour, tourImages, departure, reviewsData] = await Promise.all(data)
        return {
            tour : tour.data, 
            images: Array.isArray(tourImages.data) ? tourImages.data : [], 
            departures: departure.data,
            reviews: reviewsData.data.reviews || [],
            averageRating: reviewsData.data.averageRating || 0,
            totalReviews: reviewsData.data.totalReviews || 0,
        }
    } catch (error) {
        console.error('Error fetching tour detail:', error);
        return {
            tour: null,
            images: [],
            departures: null,
            reviews: [],
            averageRating: 0,
            totalReviews: 0,
        }
    }
})

const tourDetailSlice = createSlice({
    name: 'tourDetail',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataTourDetail.fulfilled, (state, action) => {
            const { tour, departures, images, reviews, averageRating, totalReviews } = action.payload
            state.tour = tour
            state.departure = departures
            state.images = images
            state.reviews = reviews
            state.averageRating = averageRating
            state.totalReviews = totalReviews
            state.status = 'success'
        })
        builder.addCase(fetchDataTourDetail.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchDataTourDetail.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Failed to fetch tour detail'
            state.tour = null
            state.images = []
            state.departure = null
            state.reviews = []
            state.averageRating = 0
            state.totalReviews = 0
        })
    }
})

export const tourDetailReducer = tourDetailSlice.reducer
export const tourDetailAction = tourDetailSlice.actions
