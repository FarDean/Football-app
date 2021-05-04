import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./leagueSlice";
import teamReducer from "./teamSlice";
import statReducer from "./statsSlice";
import liveScoreReducer from "./liveScoreSlice";
import standingReducer from "./standingSlice";
import scheduleReducer from "./scheduleSlice";
import singleFixtureReducer from "./singleFixtureSlice";

export default configureStore({
	reducer: {
		league: leagueReducer,
		team: teamReducer,
		stat: statReducer,
		livescore: liveScoreReducer,
		standing: standingReducer,
		schedule: scheduleReducer,
		singleFixture: singleFixtureReducer,
	},
});
