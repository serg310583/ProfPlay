import { createSlice } from '@reduxjs/toolkit';

export const warningModalSlice = createSlice({
  name: 'warningModal',
  initialState: {
    isWarningModalVisible: false,
    link: '',
  },
  reducers: {
    openWarningModal: (state, action) => {
      state.isWarningModalVisible = true;
      state.link = action.payload;
    },
    closeWarningModal: (state) => {
      state.isWarningModalVisible = false;
      state.link = '';
    },
  },
});

export const { openWarningModal, closeWarningModal } =
  warningModalSlice.actions;

export default warningModalSlice.reducer;
