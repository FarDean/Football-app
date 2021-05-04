import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";

// Thunk
export const fetchSchedule = createAsyncThunk(
	"schedule/fetchSchedule",
	async ({ leagueId, lastWeek, nextWeek }) => {
		const res = await fetch(
			`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${config.defaultSeason}&from=${lastWeek}&to=${nextWeek}`,
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
export const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		status: "idle",
		schedule: [],
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchSchedule.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchSchedule.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.schedule = action.payload;
		},
		[fetchSchedule.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default scheduleSlice.reducer;
