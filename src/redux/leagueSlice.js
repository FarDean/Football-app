import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";
// Thunk
export const fetchLeagues = createAsyncThunk(
	"leagues/fetchLeagues",
	async (season = config.defaultSeason) => {
		const res = await fetch(`https://v3.football.api-sports.io/leagues?season=${season}`, {
			method: "GET",
			headers: {
				"x-rapidapi-host": config.host,
				"x-rapidapi-key": config.key,
			},
		});
		const data = await res.json();
		return data.response;
	}
);

// slice
export const leagueSlice = createSlice({
	name: "leagues",
	initialState: {
		leagues: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchLeagues.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchLeagues.fulfilled]: (state, action) => {
			state.status = "succeeded";
			const serieA = action.payload.find(x => x.league.id === 135);
			const premierLeague = action.payload.find(x => x.league.id === 39);
			const laLiga = action.payload.find(x => x.league.id === 140);
			const bundesLiga = action.payload.find(x => x.league.id === 78);
			state.leagues.push(serieA);
			state.leagues.push(premierLeague);
			state.leagues.push(laLiga);
			state.leagues.push(bundesLiga);
		},
		[fetchLeagues.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default leagueSlice.reducer;
