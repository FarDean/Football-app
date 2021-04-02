import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const res = await fetch("/api/users");
	const data = await res.json();
	return data.users;
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = "succeeded";
			// Add any fetched posts to the array
			state.users = state.users.concat(action.payload);
		},
		[fetchUsers.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectAllUsers = state => state.users;

export const selectUserById = (state, userId) => state.users.find(x => x.id === userId);
