import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./leagueSlice";
import teamDeatailReducer from "./teamDetailSlice";
import leagueStatsReducer from "./leagueStatsSlice";
import liveScoreReducer from "./liveScoreSlice";
import standingReducer from "./standingSlice";
import scheduleReducer from "./scheduleSlice";
import singleFixtureReducer from "./singleFixtureSlice";

export const store = configureStore({
	reducer: {
		league: leagueReducer,
		team: teamDeatailReducer,
		leagueStats: leagueStatsReducer,
		livescore: liveScoreReducer,
		standing: standingReducer,
		schedule: scheduleReducer,
		singleFixture: singleFixtureReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
