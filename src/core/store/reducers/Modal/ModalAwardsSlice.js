import { createSlice } from '@reduxjs/toolkit';

export const awardModalSlice = createSlice({
  name: 'awardModal',
  initialState: {
    isAwardModalVisible: false,
    awardInfo: '',
  },
  reducers: {
    openAwardModal: (state, action) => {
      state.isAwardModalVisible = true;
      state.awardInfo = action.payload;
    },
    closeAwardModal: (state) => {
      state.isAwardModalVisible = false;
      state.awardInfo = '';
    },
    setAwardInfo: (state, action) => {
      state.awardInfo = action.payload;
    },
  },
});

export const { openAwardModal, closeAwardModal, setAwardInfo } =
  awardModalSlice.actions;

export default awardModalSlice.reducer;
