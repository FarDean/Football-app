import { useSelector, useDispatch } from "react-redux";
import { fetchLiveScores } from "./../redux/liveScoreSlice";
import { useEffect } from "react";
import { Hero } from "./utils/Hero";

export const LiveScores = () => {
	const dispatch = useDispatch();
	const liveScores = useSelector(state => state.livescore.liveScores);
	const liveScoreStatus = useSelector(state => state.livescore.status);

	useEffect(() => {
		let apiTimeout;

		if (liveScoreStatus === "idle") {
			dispatch(fetchLiveScores());
		}

		if (liveScoreStatus === "succeeded") {
			apiTimeout = setTimeout(() => {
				dispatch(fetchLiveScores());
			}, 90000);
		}

		return () => {
			clearTimeout(apiTimeout);
		};
	}, [dispatch, liveScoreStatus]);

	console.log("live", liveScores);

	return (
		<>
			<Hero text="Live Scores" />
			<div>
				{liveScores.length === 0 && <h1>There are no matches being played currently!</h1>}
				{liveScores.map((score, i) => (
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							padding: "15px 0",
							fontSize: "2rem",
						}}
						key={i}
					>
						{score.fixture.status.elapsed}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<img src={score.teams.home.logo} alt="" />
							{score.teams.home.name} {score.goals.home}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<img src={score.teams.away.logo} alt="" />
							{score.teams.away.name} {score.goals.away}
						</div>
					</div>
				))}
			</div>
		</>
	);
};
