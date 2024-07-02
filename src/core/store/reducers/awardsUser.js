import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { awardsApi } from '../../../api/axios';

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
};
// const id = localStorage.getItem('user_id') || localStorage.getItem('userId')

export const fetchAwardUser = createAsyncThunk(
  'awards/getAwards',
  async (userId, thunkAPI) => {
    try {
      const response = await awardsApi.get(`/user-achievements/${userId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAwardUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchAwardUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchAwardUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});
// Селектор для получения данных о наградах
export const AwardState = (state) => state.awards;
export const selectAwardsData = (state) => state.awards.data;
export const selectAwardsLoading = (state) => state.awards.isLoading;
export default awardsSlice.reducer;
