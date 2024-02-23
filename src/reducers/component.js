import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmModal: {
    open: false,
    textHeader: "Text in a modal",
    textBody:
      "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
  },
  toast: {
    open: false,
    text: "This is a success Alert inside a Snackbar!",
    severity: "success",
    variant: "filled",
    duration: 6000,
    vertical: "top",
    horizontal: "right",
  },
  isDarkMode: false,
};

const mySlice = createSlice({
  name: "componentReducer",
  initialState,
  reducers: {
    setConfirmModal: (state, action) => {
      state.confirmModal = { ...state.confirmModal, ...action.payload };
    },
    setToast: (state, action) => {
      state.toast = { ...state.toast, ...action.payload };
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setConfirmModal, setToast, setIsDarkMode } = mySlice.actions;
export default mySlice.reducer;
