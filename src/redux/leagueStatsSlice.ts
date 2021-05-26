import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "./../config";

// Types
interface LeagueStatsState {
	status: "idle" | "loading" | "succeeded" | "failed";
	leagueStats: any[];
	error: null | undefined | string;
}

const initialState: LeagueStatsState = {
	status: "idle",
	leagueStats: [],
	error: null,
};

// Thunk
export const fetchLeagueStats = createAsyncThunk(
	"leagueStats/fetchLeagueStats",
	async (leagueId: string | number) => {
		const getTopScorers = fetch(
			`https://v3.football.api-sports.io/players/topscorers?season=${config.defaultSeason}&league=${leagueId}`
		);
		const getTopAssists = fetch(
			`https://v3.football.api-sports.io/players/topassists?season=${config.defaultSeason}&league=${leagueId}`
		);
		const getTopYellowCards = fetch(
			`https://v3.football.api-sports.io/players/topyellowcards?season=${config.defaultSeason}&league=${leagueId}`
		);
		const getTopRedCards = fetch(
			`https://v3.football.api-sports.io/players/topredcards?season=${config.defaultSeason}&league=${leagueId}`
		);

		let [topScorers, topAssists, topYellowCards, topRedCards] = await Promise.all([
			getTopScorers,
			getTopAssists,
			getTopYellowCards,
			getTopRedCards,
		]);

		const data = res.map(async call => {
			const resolved = await call.json();
			return resolved.response;
		});
		return data;
	}
);

// Slice
export const leagueStatsSlice = createSlice({
	name: "leagueStats",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchLeagueStats.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchLeagueStats.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.leagueStats = action.payload;
		});
		builder.addCase(fetchLeagueStats.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default leagueStatsSlice.reducer;
