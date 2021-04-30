import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk
const fetchSingleFixture = createAsyncThunk("singleFixture/fetchSingleFixture", async () => {
	const res = await fetch();
});
