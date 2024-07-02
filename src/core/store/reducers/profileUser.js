import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../../api/axios';
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
};

export const fetchGetInfoUser = createAsyncThunk(
  'infoUser/getInfoUser',
  async (userId, thunkAPI) => {
    try {
      const response = await userApi.get(`/profile/${userId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchPostInfoUser = createAsyncThunk(
  'infoUser/postInfoUser',
  async (values, thunkAPI) => {
    try {
      const response = await userApi.post(`/profile`, values);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const fetchPatchInfoUser = createAsyncThunk(
  'infoUser/patchInfoUser',
  async ({ userId, values }, thunkAPI) => {
    try {
      const response = await userApi.patch(`/profile/${userId}`, values);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const infoUserSlice = createSlice({
  name: 'infoUser',
  initialState,
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(fetchGetInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetInfoUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGetInfoUser.rejected, (state) => {
        state.isLoading = false;
      })
      //POST
      .addCase(fetchPostInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostInfoUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchPostInfoUser.rejected, (state) => {
        state.isLoading = false;
      })
      //PATCH
      .addCase(fetchPatchInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatchInfoUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchPatchInfoUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const StateInfoUserData = (state) => state.infoUser;

export const selectInfoUserData = (state) => state.infoUser.data;
export const selectInfoUserLoading = (state) => state.infoUser.isLoading;
export const selectInfoUserSuccess = (state) => state.infoUser.isSuccess;
export default infoUserSlice.reducer;
