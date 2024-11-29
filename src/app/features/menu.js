import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  closed: false,
  pinned: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.closed = action.payload;
    },
    pinMenu: (state, action) => {
      state.pinned = action.payload;
    },
  },
});

export const { setMenu, pinMenu } = menuSlice.actions;

export default menuSlice.reducer;
