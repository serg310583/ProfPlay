import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	selectedAnswers: [],
}

const selectedAnswersSlice = createSlice({
	name: 'selectedAnswers',
	initialState,
	reducers: {
		setSelectedAnswers: (state, action) => {
			state.selectedAnswers = action.payload
		},

		resetSelectedAnswers: () => initialState,
	},
})

export const {
	setSelectedAnswers,

	resetSelectedAnswers,
} = selectedAnswersSlice.actions

export const selectSelectedAnswers = (state) => state.selectedAnswers

export default selectedAnswersSlice.reducer
