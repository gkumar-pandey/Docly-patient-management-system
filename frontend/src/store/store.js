import { configureStore } from "@reduxjs/toolkit";
import { patientReducer } from "./features/patient";
import { wardReducer } from "./features/ward";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    ward: wardReducer,
  },
});

export default store;
