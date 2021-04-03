import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";
// thunk
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
	const res = await fetch(`${config.baseUrl}/teams`, {
		method: "GET",
		headers: {
			"x-rapidapi-host": config.host,
			"x-rapidapi-key": config.key,
		},
	});
	// const data = await res.json();
	// return data.users;
});
