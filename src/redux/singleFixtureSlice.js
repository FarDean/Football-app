import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

// Thunk
export const fetchSingleFixture = createAsyncThunk("singleFixture/fetchSingleFixture", async id => {
	const res = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
		method: "GET",
		headers: {
			"x-rapidapi-host": config.host,
			"x-rapidapi-key": config.key,
		},
	});
	const data = await res.json();
	return data.response;
});

// Slice
export const singleFixtureSlice = createSlice({
	name: "singleFixture",
	initialState: {
		status: "idle",
		fixture: {},
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchSingleFixture.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchSingleFixture.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.fixture = action.payload;
		},
		[fetchSingleFixture.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default singleFixtureSlice.reducer;
