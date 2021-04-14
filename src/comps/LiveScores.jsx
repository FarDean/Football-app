import { useSelector, useDispatch } from "react-redux";
import { fetchLiveScores } from "./../redux/liveScoreSlice";
import { useEffect } from "react";
import { Hero } from "./utils/Hero";

export const LiveScores = () => {
	const dispatch = useDispatch();
	const liveScores = useSelector(state => state.livescore.liveScores);
	const liveScoreStatus = useSelector(state => state.livescore.status);

	useEffect(() => {
		if (liveScoreStatus === "idle") {
			dispatch(fetchLiveScores());
		}
	}, [dispatch, liveScoreStatus]);

	console.log("live", liveScores);

	return <Hero text="Live Scores" />;
};
