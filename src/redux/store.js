import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./leagueSlice";
import teamReducer from "./teamSlice";

export default configureStore({
	reducer: {
		league: leagueReducer,
		team: teamReducer,
	},
});
