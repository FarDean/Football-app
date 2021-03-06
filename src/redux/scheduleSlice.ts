import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
interface ScheduleState {
	status: "idle" | "loading" | "failed" | "succeeded";
	schedule: any[];
	error: string | undefined | null;
}

interface Params {
	leagueId: string | number;
	lastWeek: string;
	nextWeek: string;
}

const initialState: ScheduleState = {
	status: "idle",
	schedule: [],
	error: null,
};

// Thunk
export const fetchSchedule = createAsyncThunk(
	"schedule/fetchSchedule",
	async ({ leagueId, lastWeek, nextWeek }: Params) => {
		const res = await fetch(
			`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${process.env.REACT_APP_DEFUALT_SEASON}&from=${lastWeek}&to=${nextWeek}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": process.env.REACT_APP_HOST!,
					"x-rapidapi-key": process.env.REACT_APP_KEY!,
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
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchSchedule.pending, (state, actoin) => {
			state.status = "loading";
		});
		builder.addCase(fetchSchedule.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.schedule = action.payload;
		});
		builder.addCase(fetchSchedule.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default scheduleSlice.reducer;
