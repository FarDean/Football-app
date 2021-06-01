import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
			`https://v3.football.api-sports.io/players/topscorers?season=${process.env.REACT_APP_DEFUALT_SEASON}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
				},
			}
		);
		const getTopAssists = fetch(
			`https://v3.football.api-sports.io/players/topassists?season=${process.env.REACT_APP_DEFUALT_SEASON}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
				},
			}
		);
		const getTopYellowCards = fetch(
			`https://v3.football.api-sports.io/players/topyellowcards?season=${process.env.REACT_APP_DEFUALT_SEASON}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
				},
			}
		);
		const getTopRedCards = fetch(
			`https://v3.football.api-sports.io/players/topredcards?season=${process.env.REACT_APP_DEFUALT_SEASON}&league=${leagueId}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
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
