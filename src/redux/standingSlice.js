import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";
// Thunk
export const fetchStanding = createAsyncThunk("standing/fetchStanding", async leagueId => {
	const res = await fetch(
		`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${config.defaultSeason}`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-host": config.host,
				"x-rapidapi-key": config.key,
			},
		}
	);
	const data = await res.json();
	return data.response;
});

// Slice
export const standingSlice = createSlice({
	name: "standing",
	initialState: {
		status: "idle",
		standing: [],
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchStanding.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchStanding.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.standing = action.payload;
		},
		[fetchStanding.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default standingSlice.reducer;
