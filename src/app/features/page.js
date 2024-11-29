import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: null };

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Action oluşturucuları, her bir durum kesici işlevi için otomatik olarak oluşturulur

export const { setName } = pageSlice.actions;

export default pageSlice.reducer;
