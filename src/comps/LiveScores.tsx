import { useAppDispatch, useAppSelector } from "./../redux/hooks";
import { fetchLiveScores } from "../redux/liveScoreSlice";
import { useEffect } from "react";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LS.module.css";
import { Error } from "./utils/Error";
import { Link } from "react-router-dom";

export const LiveScores = () => {
	const dispatch = useAppDispatch();
	const liveScores = useAppSelector(state => state.livescore.liveScores);
	const liveScoreStatus = useAppSelector(state => state.livescore.status);

	useEffect(() => {
		let apiTimeout: ReturnType<typeof setTimeout>;

		if (liveScoreStatus === "succeeded") {
			apiTimeout = setTimeout(() => {
				dispatch(fetchLiveScores());
			}, 90000);
		}

		return () => {
			clearTimeout(apiTimeout);
		};
	}, [dispatch, liveScoreStatus]);

	useEffect(() => {
		dispatch(fetchLiveScores());
	}, [dispatch]);

	if (liveScoreStatus === "failed") return <Error />;

	return (
		<>
			<Hero text="Live Scores" />
			<div>
				{liveScores.length === 0 && (
					<div className={styles.nomatch}>
						There are no matches being played currently!
					</div>
				)}
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
