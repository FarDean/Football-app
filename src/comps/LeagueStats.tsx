import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { fetchLeagueStats } from "./../redux/leagueStatsSlice";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";
import styles from "./../styles/LeagueStats.module.css";

interface Props {
	leagueId: string | number;
}
export const LeagueStats: React.FC<Props> = ({ leagueId }): JSX.Element => {
	const dispatch = useAppDispatch();

	const leagueStats = useAppSelector(state => state.leagueStats.leagueStats);
	const topScorers = useAppSelector(state =>
		state.leagueStats.leagueStats.topScorers.slice(0, 5)
	);
	const topAssists = useAppSelector(state =>
		state.leagueStats.leagueStats.topAssists.slice(0, 5)
	);
	const topYellowCards = useAppSelector(state =>
		state.leagueStats.leagueStats.topYellowCards.slice(0, 5)
	);
	const topRedCards = useAppSelector(state =>
		state.leagueStats.leagueStats.topRedCards.slice(0, 5)
	);
	const leagueStatsStatus = useAppSelector(state => state.leagueStats.status);
	const error = useAppSelector(state => state.leagueStats.error);

	useEffect(() => {
		dispatch(fetchLeagueStats(leagueId));
	}, [dispatch, leagueId]);

	console.log(leagueStats);

	if (leagueStatsStatus === "loading") return <Loader />;

	if (leagueStatsStatus === "failed") return <Error text={error} />;

	if (leagueStatsStatus === "succeeded")
		return (
			<div className={styles.container}>
				<div className={styles.stats}>
					<h2 className={styles.title}>Top Scorers</h2>
					{topScorers[0] &&
						topScorers.map((player: any, i: number) => (
							<div key={i} className={styles.wrapper}>
								<div className={styles.detail}>
									<div className={styles.player}>
										<img src={player.player.photo} alt="" />
										<p>{player.player.name}</p>
									</div>
									<div>{player.statistics[0].goals.total}</div>
								</div>
								<div className={styles.team}>
									<img src={player.statistics[0].team.logo} alt="" />
									<div>{player.statistics[0].team.name}</div>
								</div>
							</div>
						))}
				</div>
				<div className={styles.stats}>
					<h2 className={styles.title}>Top Assists</h2>
					{topAssists[0] &&
						topAssists.map((player: any, i: number) => (
							<div key={i} className={styles.wrapper}>
								<div className={styles.detail}>
									<div className={styles.player}>
										<img src={player.player.photo} alt="" />
										<p>{player.player.name}</p>
									</div>
									<div>{player.statistics[0].goals.assists}</div>
								</div>
								<div className={styles.team}>
									<img src={player.statistics[0].team.logo} alt="" />
									<div>{player.statistics[0].team.name}</div>
								</div>
							</div>
						))}
				</div>
				<div className={styles.stats}>
					<h2 className={styles.title}>Top Yellow Cards</h2>
					{topYellowCards[0] &&
						topYellowCards.map((player: any, i: number) => (
							<div key={i} className={styles.wrapper}>
								<div className={styles.detail}>
									<div className={styles.player}>
										<img src={player.player.photo} alt="" />
										<p>{player.player.name}</p>
									</div>
									<div>{player.statistics[0].cards.yellow}</div>
								</div>
								<div className={styles.team}>
									<img src={player.statistics[0].team.logo} alt="" />
									<div>{player.statistics[0].team.name}</div>
								</div>
							</div>
						))}
				</div>
				<div className={styles.stats}>
					<h2 className={styles.title}>Top Red Cards</h2>
					{topRedCards[0] &&
						topRedCards.map((player: any, i: number) => (
							<div key={i} className={styles.wrapper}>
								<div className={styles.detail}>
									<div className={styles.player}>
										<img src={player.player.photo} alt="" />
										<p>{player.player.name}</p>
									</div>
									<div>{player.statistics[0].cards.red}</div>
								</div>
								<div className={styles.team}>
									<img src={player.statistics[0].team.logo} alt="" />
									<div>{player.statistics[0].team.name}</div>
								</div>
							</div>
						))}
				</div>
			</div>
		);

	return <Loader />;
};
