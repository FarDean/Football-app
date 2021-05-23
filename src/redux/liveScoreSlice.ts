import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

// Types
interface LiveScores {
	liveScores: unknown[];
	status: string;
	error: null | string;
}

const initialState: LiveScores = {
	liveScores: [],
	status: "idle",
	error: null,
};

// Thunk
export const fetchLiveScores = createAsyncThunk("liveScores/fetchLiveScores", async () => {
	const res = await fetch("https://v3.football.api-sports.io/fixtures?live=39-135-140-78", {
		method: "GET",
		headers: {
			"x-rapidapi-host": config.host,
			"x-rapidapi-key": config.key,
		},
	});
	const data = await res.json();
	return data.response;
});

// slice
export const liveScoresSlice = createSlice({
	name: "livescore",
	initialState,
	reducers: {},
	extraReducers: builer => {
		builer.addCase(fetchLiveScores.pending, (state, action) => {
			state.status = "loading";
		});
		builer.addCase(fetchLiveScores.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.liveScores = action.payload;
		});
		builer.addCase(fetchLiveScores.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default liveScoresSlice.reducer;
