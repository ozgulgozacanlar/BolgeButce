import { createSlice } from '@reduxjs/toolkit';

// Prop Keys -> Qlikte tanımlı şekilde fieldname
const initialState = {
  Year: null,
  Month: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /**
     * @example
     * dispatch(setFilter({ field: "Year", value: "2024" }))
     */
    setFilter: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setAy, setYıl, setMonth, setFilter, setTime } = filterSlice.actions;

export default filterSlice.reducer;
