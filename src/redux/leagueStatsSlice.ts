import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "./../config";

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

		const res = await Promise.all();
	}
);
