import { configureStore } from "@reduxjs/toolkit";
import { portfolioReducer } from "./portfolio.slice";
import { formReducer } from "./form.slice";

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    form: formReducer,
  },
});

export default store;
