import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export enum FetcherStatus {
  INITIALIZED = "INITIALIZED",
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

export type FetcherState = {
  response: string | undefined;
  status: FetcherStatus;
  error: string | undefined;
};

export const defaultState: FetcherState = {
  response: undefined,
  status: FetcherStatus.INITIALIZED,
  error: undefined,
};

export const getData = createAsyncThunk(
  "fetcher/getData",
  async (URL: string): Promise<string> => {
    const response = await fetch(URL);
    return response.json();
  }
);

const fetcher = createSlice({
  name: "fetcher",
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      return { ...state, status: FetcherStatus.PENDING };
    });
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<string>) => {
      return { ...state, status: FetcherStatus.FULFILLED, response: action.payload };
    });
    builder.addCase(getData.rejected, (state, { error }) => {
      return { ...state, status: FetcherStatus.REJECTED, error: error.message };
    });
  },
});

export const { actions, reducer } = fetcher;
