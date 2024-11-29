/* eslint-disable import/prefer-default-export */

import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menu';
import filterReducer from './features/filter';
import pageReducer from './features/page';

// Redux store'unu yapılandırır
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
    page: pageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
