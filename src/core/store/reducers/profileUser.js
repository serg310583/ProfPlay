import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../../api/axios';
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
};

export const fetchGetProfileUser = createAsyncThunk(
  'profileUser/getProfileUser',
  async (userId, thunkAPI) => {
    try {
      const response = await userApi.get(`/profile/${userId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchPostProfileUser = createAsyncThunk(
  'profileUser/postProfileUser',
  async (values, thunkAPI) => {
    try {
      const response = await userApi.post(`/profile`, values);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchPatchProfileUser = createAsyncThunk(
  'profileUser/patchProfileUser',
  async ({ userId, values }, thunkAPI) => {
    try {
      const response = await userApi.patch(`/profile/${userId}`, values);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const profileUserSlice = createSlice({
  name: 'profileUser',
  initialState,
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(fetchGetProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGetProfileUser.rejected, (state) => {
        state.isLoading = false;
      })
      //POST
      .addCase(fetchPostProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchPostProfileUser.rejected, (state) => {
        state.isLoading = false;
      })
      //PATCH
      .addCase(fetchPatchProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatchProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchPatchProfileUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default profileUserSlice.reducer;
