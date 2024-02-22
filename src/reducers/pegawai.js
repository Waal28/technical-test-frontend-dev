import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pegawai: [],
  user: {
    id: null,
    nama: "",
    jalan: "",
    provinsi: {
      id: null,
      name: "",
    },
    kota: {
      id: null,
      name: "",
    },
    kecamatan: {
      id: null,
      name: "",
    },
  },
  provinsi: [
    {
      id: null,
      name: "",
    },
  ],
  kota: [
    {
      id: null,
      name: "",
    },
  ],
  kecamatan: [
    {
      id: null,
      name: "",
    },
  ],
};

const mySlice = createSlice({
  name: "pegawaiReducer",
  initialState,
  reducers: {
    setPegawai: (state, action) => {
      state.pegawai = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setProvinsi: (state, action) => {
      state.provinsi = action.payload;
    },
    setKota: (state, action) => {
      state.kota = action.payload;
    },
    setKecamatan: (state, action) => {
      state.kecamatan = action.payload;
    },
  },
});

export const { setPegawai, setUser, setProvinsi, setKota, setKecamatan } =
  mySlice.actions;
export default mySlice.reducer;
