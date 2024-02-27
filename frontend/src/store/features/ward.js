import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wards: [],
  isLoading: false,
  error: "",
};

const API = "https://docly-patient-management-system.vercel.app/api/v1";

export const fetchWardData = createAsyncThunk("fetchWardData", async () => {
  const res = await axios.get(`${API}/wards`);
  return res.data;
});

export const addNewWard = createAsyncThunk(
  "addNewWard",
  async ({ wardData }) => {
    const res = await axios.post(`${API}/wards`, wardData);
    return res.data;
  }
);

export const updateWard = createAsyncThunk(
  "updateWard",
  async ({ id, updatedData }) => {
    const res = await axios.post(`${API}/wards/${id}`, updatedData);
    return res.data;
  }
);

export const deleteWard = createAsyncThunk("deleteWard", async ({ id }) => {
  const res = await axios.delete(`${API}/wards/${id}`);
  if (res.status === 200) {
    return id;
  }
  return res.data;
});
const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWardData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wards = action.payload.wards;
    });
    builder.addCase(fetchWardData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(addNewWard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNewWard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wards.push(action.payload.ward);
    });
    builder.addCase(addNewWard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateWard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateWard.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedWardData = action.payload.ward;
      console.log(updatedWardData)
      const index = state.wards.findIndex(
        ({ _id }) => _id === updatedWardData._id
      );

      if (index !== -1) {
        state.wards[index] = updatedWardData;
      }
    });
    builder.addCase(updateWard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteWard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteWard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wards = state.wards.filter(({ _id }) => _id !== action.payload);
    });
  },
});

export const wardReducer = wardSlice.reducer;
