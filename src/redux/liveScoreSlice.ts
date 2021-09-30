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

// Thunks
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

export const fetchTodayMatches = createAsyncThunk("todayMatches/fetchTodayMatches", async () => {
	const today = getToday();
	const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
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
	extraReducers: builder => {
		builder.addCase(fetchLiveScores.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchLiveScores.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.liveScores = action.payload;
		});
		builder.addCase(fetchLiveScores.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});
function getToday() {
	const today = new Date();
	return (
		("0000" + today.getFullYear().toString()).slice(-4) +
		"-" +
		("00" + today.getMonth().toString()).slice(-2) +
		"-" +
		("00" + today.getDate().toString()).slice(-2)
	);
}
export default liveScoresSlice.reducer;
