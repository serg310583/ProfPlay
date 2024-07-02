import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router'
const navigate = useNavigate

const initialState = {
	currentUser: undefined,
	isLoading: false,
}

export const register = createAsyncThunk(
	'auth/register',
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				'https://api.users.skroy.ru/user',
				userData
			)
			return response.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors)
		}
	}
)
export const login = createAsyncThunk(
	'auth/login',
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				'https://api.users.skroy.ru/user/check_password',
				{
					login: userData.username,
					password: userData.password,
				},
				{
					headers: {
						accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			return response.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors)
		}
	}
)
export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('user_id')
	localStorage.removeItem('userId')
	navigate('/profile/userTests')
})

export const getCurrentUser = createAsyncThunk(
	'auth/getCurrentUser',
	async (_, thunkAPI) => {
		try {
			const user_id = localStorage.getItem('user_id') ?? ''
			const response = await axios.get(
				`https://api.users.skroy.ru/user/${user_id}`,
				{
					headers: {
						user_id: `${user_id}`,
					},
				}
			)
			return response.data.user_id
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors)
		}
	}
)
const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder
			//register
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.currentUser = action.payload
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
			})
			//logIn
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.currentUser = action.payload
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
			})
			//getCurrentUser
			.addCase(getCurrentUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.currentUser = action.payload
				state.user_id = action.payload.user_id
			})
			.addCase(getCurrentUser.rejected, (state) => {
				state.isLoading = false
				state.currentUser = null
				state.user_id = null
			})
			//logOut
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.currentUser = null
			})
	},
})
export const selectAuthLoading = (state) => state.auth.isLoading
export default authSlice.reducer
