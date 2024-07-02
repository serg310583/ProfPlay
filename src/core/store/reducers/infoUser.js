import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../../api/axios'
const initialState = {
	isLoading: false,
	data: [],
}

export const fetchInfoUser = createAsyncThunk(
	'infoUser/getInfoUser',
	async (userId, thunkAPI) => {
		try {
			const response = await userApi.get(`/profile/${userId}`)
			return response.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors)
		}
	}
)

const infoUserSlice = createSlice({
	name: 'infoUser',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchInfoUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchInfoUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.data = action.payload
			})
			.addCase(fetchInfoUser.rejected, (state) => {
				state.isLoading = false
			})
	},
})
// Селектор для получения данных о наградах
export const selectInfoUserData = (state) => state.infoUser.data
export const selectInfoUserLoading = (state) => state.infoUser.isLoading
export default infoUserSlice.reducer
