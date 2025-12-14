import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface initialStateType {
    status: 'idle' | 'loading' | 'error' | 'success',
    error: string | null,
    token: string
}

const initialState : initialStateType = {
    status: 'idle',
    error: null,
    token: ''
}

export const userLogin = createAsyncThunk('user/login', async (userInfo: {email: string, password: string}, { rejectWithValue }) => {
    try {
        const {email , password} = userInfo    
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {email, password} )
        return res.data
    } catch (error: any) {
        if (error.response?.data) {
            return rejectWithValue(error.response.data)
        }
        return rejectWithValue({ message: 'Có lỗi xảy ra' })
    }
})

export const userRegister = createAsyncThunk('user/reg', async (userInfo: {name: string, email: string, password: string, phoneNumber: string}, { rejectWithValue }) => {
    try {
        const {name, email, password, phoneNumber} = userInfo
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reg`, {name, email, password, phoneNumber})
        return res.data
    } catch (error: any) {
        if (error.response?.data) {
            return rejectWithValue(error.response.data)
        }
        return rejectWithValue({ message: 'Có lỗi xảy ra' })
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.token = ''
            state.status = 'idle';
            state.error = null; 
        }
    },
    extraReducers: (builder) => {

        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.status = 'success'
            localStorage.setItem('token', state.token)
            state.error = null
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'ACTION IS ERROR'
        })

        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.status = 'success'
            localStorage.setItem('token', state.token)
            state.error = null
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'ACTION IS ERROR'
        })
    }
})
export const {userLogout} = userSlice.actions
export const userReducer = userSlice.reducer
export const userAction = userSlice.actions