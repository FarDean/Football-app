import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";
// thunk
export const fetchTeams = createAsyncThunk(
	"teams/fetchTeams",
	async (leagueId, season = config.defaultSeason) => {
		const res = await fetch(
			`https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`,
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
	}
);

// slice
export const teamSlice = createSlice({
	name: "teams",
	initialState: {
		teams: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchTeams.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchTeams.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.teams = action.payload;
		},
		[fetchTeams.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default teamSlice.reducer;
