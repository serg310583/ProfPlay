import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
};

export const fetchQuizzesUser = createAsyncThunk(
  'tests/getTests',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.opros.skroy.ru/answers/user/${userId}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzesUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchQuizzesUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchQuizzesUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});
// Селектор для получения данных о тестах пользователей
export const StateQuizzes = (state) => state.quizzes;

export const selectQuizzesData = (state) => state.quizzes.data;
export const selectQuizzesLoading = (state) => state.quizzes.isLoading;

export default quizzesSlice.reducer;
