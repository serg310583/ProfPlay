import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../../api/axios'
const initialState = {
	isLoading: false,
	data: [],
}
export const fetchGetQuiz = createAsyncThunk(
	'quiz/getQuiz',
	async (url, thunkAPI) => {
		try {
			const response = await api.get(url)
			return response.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors)
		}
	}
)
const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	extraReducers: (builder) => {
		builder
			//getQuiz
			.addCase(fetchGetQuiz.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchGetQuiz.fulfilled, (state, action) => {
				state.isLoading = false
				state.data = action.payload
			})
			.addCase(fetchGetQuiz.rejected, (state) => {
				state.isLoading = false
			})
	},
})
// Селектор для получения данных о тесте
export const selectQuizData = (state) => state.quiz.data
export const selectQuizLoading = (state) => state.quiz.isLoading

export default quizSlice.reducer
