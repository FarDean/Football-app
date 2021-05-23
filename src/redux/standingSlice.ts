import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

// Thunk
interface StandingState {
	status: string;
	standing: unknown[];
	error: null | string;
}

const initialState: StandingState = {
	status: "idle",
	standing: [],
	error: null,
};

// Thunk
export const fetchStanding = createAsyncThunk(
	"standing/fetchStanding",
	async (leagueId: string | number) => {
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
	}
);

// Slice
export const standingSlice = createSlice({
	name: "standing",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchStanding.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchStanding.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.standing = action.payload;
		});
		builder.addCase(fetchStanding.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default standingSlice.reducer;
