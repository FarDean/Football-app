import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "./../config";
// Types
interface TeamState {
	status: string;
	team: unknown;
	error: null | string;
}
interface Params {
	leagueId: number;
	teamId: number;
}

// Inital state
const initialState: TeamState = {
	status: "idle",
	team: {},
	error: null,
};

// Thunk
export const fetchTeam = createAsyncThunk("team/fetchTeam", async (params: Params) => {
	const res = await fetch(
		`https://v3.football.api-sports.io/teams/statistics?league=${params.leagueId}&team=${params.teamId}&season=${config.defaultSeason}`,
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
export const teamSlice = createSlice({
	name: "team",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchTeam.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchTeam.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.team = action.payload;
		});
		builder.addCase(fetchTeam.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default teamSlice.reducer;
