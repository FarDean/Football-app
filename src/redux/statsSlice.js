import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk
export const fetchStats = createAsyncThunk("stats/fetchStats", async (leagueId, teamId, season) => {
	const res = await fetch(
		`https://v3.football.api-sports.io/teams/statistics?league=${leagueId}&team=${teamId}&season=${season}`
	);
	const data = await res.json();
	return data.response;
});

export const statsSlice = createSlice({
	name: "stat",
	initialState: {
		stats: {},
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchStats.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchStats.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.stats = action.payload;
		},
		[fetchStats.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default statsSlice.reducer;
