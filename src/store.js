import { configureStore } from "@reduxjs/toolkit";
import pegawaiReducer from "./reducers/pegawai";
import componentReducer from "./reducers/component";
export const store = configureStore({
  reducer: {
    pegawaiReducer,
    componentReducer,
  },
});
