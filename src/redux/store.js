import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./leagueSlice";
import teamReducer from "./teamSlice";
import statReducer from "./statsSlice";
import liveScoreReducer from "./liveScoreSlice";

export default configureStore({
	reducer: {
		league: leagueReducer,
		team: teamReducer,
		stat: statReducer,
		livescore: liveScoreReducer,
	},
});
