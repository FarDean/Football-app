import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../config";

// Types
interface SingleFixtureState {
	status: string;
	fixture: unknown;
	error: string | undefined | null;
}

const initialState: SingleFixtureState = {
	status: "idle",
	fixture: {},
	error: null,
};

// Thunk
export const fetchSingleFixture = createAsyncThunk(
	"singleFixture/fetchSingleFixture",
	async (id: string | number) => {
		const res = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
			method: "GET",
			headers: {
				"x-rapidapi-host": config.host,
				"x-rapidapi-key": config.key,
			},
		});
		const data = await res.json();
		return data.response[0];
	}
);

// Slice
export const singleFixtureSlice = createSlice({
	name: "singleFixture",
	initialState,
	reducers: {},
	extraReducers: builer => {
		builer.addCase(fetchSingleFixture.pending, (state, action) => {
			state.status = "loading";
		});
		builer.addCase(fetchSingleFixture.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.fixture = action.payload;
		});
		builer.addCase(fetchSingleFixture.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

export default singleFixtureSlice.reducer;
