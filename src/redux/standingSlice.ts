import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk
interface StandingState {
	status: "idle" | "loading" | "failed" | "succeeded";
	standing: any[];
	error: string | undefined | null;
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
			`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${process.env.REACT_APP_DEFUALT_SEASON}`,
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
