// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { config } from "../config";

// // Types
// interface StatState

// // Thunk
// export const fetchStats = createAsyncThunk("stats/fetchStats", async ({ leagueId, teamId }) => {
// 	const res = await fetch(
// 		`https://v3.football.api-sports.io/teams/statistics?league=${leagueId}&team=${teamId}&season=${config.defaultSeason}`,
// 		{
// 			method: "GET",
// 			headers: {
// 				"x-rapidapi-host": config.host,
// 				"x-rapidapi-key": config.key,
// 			},
// 		}
// 	);
// 	const data = await res.json();
// 	return data.response;
// });

// export const statsSlice = createSlice({
// 	name: "stat",
// 	initialState: {
// 		stats: {},
// 		status: "idle",
// 		error: null,
// 	},
// 	reducers: {},
// 	extraReducers: {
// 		[fetchStats.pending]: (state, action) => {
// 			state.status = "loading";
// 		},
// 		[fetchStats.fulfilled]: (state, action) => {
// 			state.status = "succeeded";
// 			state.stats = { ...action.payload };
// 		},
// 		[fetchStats.rejected]: (state, action) => {
// 			state.status = "failed";
// 			state.error = action.error.message;
// 		},
// 	},
// });

// export default statsSlice.reducer;
