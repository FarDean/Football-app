import { useSelector, useDispatch } from "react-redux";
import { fetchLiveScores } from "./../redux/liveScoreSlice";
import { useEffect } from "react";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LS.module.css";
import { Error } from "./utils/Error";
import { Link } from "react-router-dom";

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
	if (liveScoreStatus === "failed") return <Error />;

	return (
		<>
			<Hero text="Live Scores" />
			<div>
				{liveScores.length === 0 && <h1>There are no matches being played currently!</h1>}
				{liveScores.map((score, i) => (
					<Link to={`/fixture/${score.fixture.id}`} className={styles.parent} key={i}>
						<div className={styles.top}>
							<div className={styles.leaguename}>{score.league.name}</div>

							<div className={styles.elapsed}>
								{score.fixture.status.long === "Halftime" ? (
									<div>{score.fixture.status.long}</div>
								) : (
									<div>
										{score.fixture.status.elapsed}
										<span>`</span>
									</div>
								)}
								<div className={styles.container}>
									<div className={styles.loader}>
										<span></span>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.teams}>
							<div className={styles.teamdetail}>
								<img className={styles.img} src={score.teams.home.logo} alt="" />
								<div>{score.teams.home.name}</div>
							</div>
							<div className={styles.goals}>
								<div className={styles.score}>{score.goals.home}</div>
								<div>-</div>
								<div className={styles.score}>{score.goals.away}</div>
							</div>
							<div className={styles.teamdetail}>
								<img className={styles.img} src={score.teams.away.logo} alt="" />
								<div>{score.teams.away.name}</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};
