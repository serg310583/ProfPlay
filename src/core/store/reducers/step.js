import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	step: 0,
}

const stepSlice = createSlice({
	name: 'step',
	initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload
		},
		incrementStep: (state) => {
			state.step += 1
		},
		decrementStep: (state) => {
			state.step -= 1
		},
		resetStep: () => initialState,
	},
})

export const { resetStep, setStep, incrementStep, decrementStep } =
	stepSlice.actions

export const selectStep = (state) => state.step.step

export default stepSlice.reducer
