import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
interface SingleFixtureState {
	status: "idle" | "loading" | "succeeded" | "failed";
	fixture: any;
	error: string | undefined | null;
}

// interface Fixture {

// }

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
				"x-rapidapi-host": process.env.REACT_APP_HOST!,
				"x-rapidapi-key": process.env.REACT_APP_KEY!,
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
