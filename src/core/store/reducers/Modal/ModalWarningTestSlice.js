import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isMenuVisible: false,
  },
  reducers: {
    openMenu: (state, action) => {
      state.isMenuVisible = true;
    },
    closeMenu: (state) => {
      state.isMenuVisible = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;
