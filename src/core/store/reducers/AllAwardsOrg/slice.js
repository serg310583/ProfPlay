import { createSlice } from '@reduxjs/toolkit';
import { fetchGetAllAwardsOrg } from './thunk';
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
};
const AllAwardsOrgSlice = createSlice({
  name: 'allAwardsOrg',
  initialState,
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(fetchGetAllAwardsOrg.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchGetAllAwardsOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchGetAllAwardsOrg.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const StateAllAwardsOrg = (state) => state.allAwardsOrg;

export const selectAllAwardsOrgLoading = (state) =>
  state.allAwardsOrg.isLoading;
export const selectAllAwardsOrgSuccess = (state) =>
  state.allAwardsOrg.isSuccess;
export const selectAllAwardsOrgData = (state) => state.allAwardsOrg.data;

export default AllAwardsOrgSlice.reducer;
