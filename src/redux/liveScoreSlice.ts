import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
interface LiveScoresState {
	liveScores: any[];
	status: "idle" | "loading" | "failed" | "succeeded";
	error: string | undefined | null;
}

const initialState: LiveScoresState = {
	liveScores: [],
	status: "idle",
	error: null,
};

// Thunk
export const fetchLiveScores = createAsyncThunk("liveScores/fetchLiveScores", async () => {
	const res = await fetch("https://v3.football.api-sports.io/fixtures?live=39-135-140-78-2-3", {
		method: "GET",
		headers: {
			"x-rapidapi-host": process.env.REACT_APP_HOST!,
			"x-rapidapi-key": process.env.REACT_APP_KEY!,
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
