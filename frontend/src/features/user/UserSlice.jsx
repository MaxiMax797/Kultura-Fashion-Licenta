import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchLoggedInUserById, updateUserById, changePassword } from './UserApi'

const initialState = {
    status:"idle",
    userInfo: null,
    errors:null,
    successMessage:null,
    changePasswordStatus: 'idle',
    changePasswordError: null
}

export const fetchLoggedInUserByIdAsync = createAsyncThunk('user/fetchLoggedInUserByIdAsync', async (id) => {
    const userInfo = await fetchLoggedInUserById(id)
    return userInfo
})

export const updateUserByIdAsync = createAsyncThunk('user/updateUserByIdAsync', async (update) => {
    const updatedUser = await updateUserById(update)
    return updatedUser
})

export const changePasswordAsync = createAsyncThunk('user/changePassword', async (data) => {
    const response = await changePassword(data);
    return response;
})

const userSlice = createSlice({
    name: "userSlice", 
    initialState:initialState,
    reducers:{}, 
    extraReducers:(builder) => {
        builder 
        .addCase(fetchLoggedInUserByIdAsync.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchLoggedInUserByIdAsync.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.userInfo = action.payload
        })

        .addCase(fetchLoggedInUserByIdAsync.rejected, (state, action) => {
            state.status = "rejected"
            state.errors = action.error
        })

        .addCase(updateUserByIdAsync.pending, (state) => {
            state.status = "pending"
        })

        .addCase(updateUserByIdAsync.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.userInfo = action.payload
        })

        .addCase(updateUserByIdAsync.rejected, (state, action) => {
            state.status = "rejected"
            state.errors = action.error
        })
        .addCase(changePasswordAsync.pending, (state) => {
        state.changePasswordStatus = 'pending';
        })
        .addCase(changePasswordAsync.fulfilled, (state) => {
        state.changePasswordStatus = 'fulfilled';
        })
        .addCase(changePasswordAsync.rejected, (state, action) => {
        state.changePasswordStatus = 'rejected';
        state.changePasswordError = action.error;
        })
    }
})

export const selectUserStatus = (state) => state.UserSlice.status
export const selectUserInfo = (state) => state.UserSlice.userInfo
export const selectUserErrors = (state) => state.UserSlice.errors
export const selectUserSuccessMessage = (state) => state.UserSlice.successMessage
export const selectChangePasswordStatus = (state) => state.UserSlice.changePasswordStatus
export const selectChangePasswordError = (state) => state.UserSlice.changePasswordError

export default userSlice.reducer