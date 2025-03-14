import { createSlice } from "@reduxjs/toolkit";

export type FormState = {
  isFormOpen: boolean;
};

const initialState: FormState = {
  isFormOpen: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formOn(state) {
      state.isFormOpen = true;
    },
    formOff(state) {
      state.isFormOpen = false;
    },
  },
});

export const { formOn, formOff } = formSlice.actions;
export const getFormStatus = (state: { form: FormState }) =>
  state.form.isFormOpen;
export const formReducer = formSlice.reducer;
