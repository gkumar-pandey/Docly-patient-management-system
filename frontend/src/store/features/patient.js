import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  patients: [],
  isLoading: false,
  error: "",
};
const API = "https://docly-patient-management-system.vercel.app/api/v1";

export const fetchPatientsData = createAsyncThunk(
  "fetchPatientsData",
  async () => {
    const res = await axios.get(`${API}/patients`);
    return res.data;
  }
);
export const createNewPatient = createAsyncThunk(
  "createNewPatient",
  async (newPatient) => {
    const res = await axios.post(`${API}/patients`, newPatient);
    return res.data;
  }
);
export const updatePatientData = createAsyncThunk(
  "updatePatientData",
  async ({ id, updatedData }) => {
    const res = await axios.post(`${API}/patients/${id}`, updatedData);
    return res.data;
  }
);
export const deletePatient = createAsyncThunk(
  "deletePatient",
  async ({ id }) => {
    const res = await axios.delete(`${API}/patients/${id}`);
    if (res.status === 200) {
      return { ...res.data, id };
    }
    return res.data;
  }
);
const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatientsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPatientsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patients = action.payload.patients;
    });
    builder.addCase(fetchPatientsData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(createNewPatient.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patients.push(action.payload.patient);
    });
    builder.addCase(createNewPatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updatePatientData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePatientData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patients = state.patients.map((patient) =>
        patient?._id === action?.payload?.patient?._id
          ? action?.payload?.patient
          : patient
      );
    });
    builder.addCase(updatePatientData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deletePatient.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload.id
      );
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const patientReducer = patientSlice.reducer;
