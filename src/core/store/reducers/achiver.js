import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { awardsApi } from '../../../api/axios';
const initialState = {
  isLoading: false,
};

export const addAchiv = createAsyncThunk(
  'achiver/addAchiv',
  async (achivData, thunkAPI) => {
    try {
      const response = await awardsApi.post('/user-achievements/', achivData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const achiverSlice = createSlice({
  name: 'achiver',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addAchiv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAchiv.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAchiv.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default achiverSlice.reducer;