import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "./../config";

// Types
interface LeagueStatsState {
	status: "idle" | "loading" | "succeeded" | "failed";
	leagueStats: {
		topScorers: any[];
		topAssists: any[];
		topYellowCards: any[];
		topRedCards: any[];
	};
	error: null | undefined | string;
}

const initialState: LeagueStatsState = {
	status: "idle",
	leagueStats: {
		topScorers: [],
		topAssists: [],
		topYellowCards: [],
		topRedCards: [],
	},
	error: null,
};

// Thunk
export const fetchLeagueStats = createAsyncThunk(
	"leagueStats/fetchLeagueStats",
	async (leagueId: string | number) => {
		const getTopScorers = fetch(
			`https://v3.football.api-sports.io/players/topscorers?season=${config.defaultSeason}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			}
		);
		const getTopAssists = fetch(
			`https://v3.football.api-sports.io/players/topassists?season=${config.defaultSeason}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			}
		);
		const getTopYellowCards = fetch(
			`https://v3.football.api-sports.io/players/topyellowcards?season=${config.defaultSeason}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			}
		);
		const getTopRedCards = fetch(
			`https://v3.football.api-sports.io/players/topredcards?season=${config.defaultSeason}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": config.host,
					"x-rapidapi-key": config.key,
				},
			}
		);

		let [topScorers, topAssists, topYellowCards, topRedCards] = await Promise.all([
			getTopScorers,
			getTopAssists,
			getTopYellowCards,
			getTopRedCards,
		]);

		topScorers = await topScorers.json();
		topAssists = await topAssists.json();
		topYellowCards = await topYellowCards.json();
		topRedCards = await topRedCards.json();

		return [topScorers, topAssists, topYellowCards, topRedCards];
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
			const payload = action.payload as any;
			state.status = "succeeded";
			state.leagueStats.topScorers = payload[0].response;
			state.leagueStats.topAssists = payload[1].response;
			state.leagueStats.topYellowCards = payload[2].response;
			state.leagueStats.topRedCards = payload[3].response;
		});
		builder.addCase(fetchLeagueStats.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default leagueStatsSlice.reducer;
