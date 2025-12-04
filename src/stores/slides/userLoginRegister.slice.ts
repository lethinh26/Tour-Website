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

export const userLogin = createAsyncThunk('user/login', async (userInfo: {email: string, password: string}) => {
    const {email , password} = userInfo    
    const res = await axios.post('http://localhost:3000/api/auth/login', {email, password} )
    return res.data
})

export const userRegister = createAsyncThunk('user/getUser', async (userInfo: {name: string, email: string, password: string}) => {
    const {name, email, password} = userInfo
    const res = await axios.post('http://localhost:3000/api/auth', {name, email, password})
    return res.data
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.token = ''
            state.status = 'idle';
            state.error = null; // Nên xóa lỗi luôn nếu có
        }
    },
    extraReducers: (builder) => {

        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.status = 'success'
            state.error = null
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message || 'ACTION IS ERROR'
        })

        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.status = 'success'
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