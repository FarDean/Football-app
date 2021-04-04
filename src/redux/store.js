import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./leagueSlice";

export default configureStore({
	reducer: {
		league: leagueReducer,
	},
});
