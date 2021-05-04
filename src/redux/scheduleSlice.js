import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "./../config";

// Thunk
export const fetchSchedule = createAsyncThunk(
	"schedule/fetchSchedule",
	async ({ lastWeek, nextWeek }) => {
		const res = await fetch;
	}
);
