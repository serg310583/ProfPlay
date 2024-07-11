//fetchGetAnswers  - получение
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../../api/axios';

const initialState = {
  isLoading: false,
  answer: [],
};
export const fetchGetAnswers = createAsyncThunk(
  'answers/getAnswers',
  async (answerId, thunkAPI) => {
    try {
      const response = await api.get(`/answers/${answerId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchPutAnswers = createAsyncThunk(
  'answers/putAnswers',
  async ({ id, answerData }, thunkAPI) => {
    try {
      const response = await api.put(`/answers/?answer_id=${id}`, answerData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const fetchPostAnswers = createAsyncThunk(
  'answers/postAnswers',
  async (answerData, thunkAPI) => {
    try {
      const response = await api.post(`/answers`, answerData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  extraReducers: (builder) => {
    builder
      //getAnswers
      .addCase(fetchGetAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answer = action.payload;
      })
      .addCase(fetchGetAnswers.rejected, (state) => {
        state.isLoading = false;
      })
      //putAnswers
      .addCase(fetchPutAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPutAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answer = action.payload;
      })
      .addCase(fetchPutAnswers.rejected, (state) => {
        state.isLoading = false;
      })
      //postAnswers
      .addCase(fetchPostAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answer = action.payload;
      })
      .addCase(fetchPostAnswers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
// Селектор для получения данных об ответах пользователя
export const StateAnswers = (state) => state.answers;

export const selectAnswersData = (state) => state.answers.answer;
export const selectAnswersLoading = (state) => state.answers.isLoading;

export default answersSlice.reducer;
