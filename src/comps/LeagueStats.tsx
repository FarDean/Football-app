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
	const topScorers = useAppSelector(state => state.leagueStats.leagueStats[0].response);
	const topAssists = useAppSelector(state => state.leagueStats.leagueStats[1].response);
	const topYellowCards = useAppSelector(state => state.leagueStats.leagueStats[2].response);
	const topRedCards = useAppSelector(state => state.leagueStats.leagueStats[3].response);
	const leagueStatsStatus = useAppSelector(state => state.leagueStats.status);
	const error = useAppSelector(state => state.leagueStats.error);

	useEffect(() => {
		if (leagueStatsStatus === "idle") {
			dispatch(fetchLeagueStats(leagueId));
		}
	}, [dispatch, leagueStatsStatus, leagueId]);

	console.log(topScorers);

	if (leagueStatsStatus === "loading") return <Loader />;

	if (leagueStatsStatus === "failed") return <Error text={error} />;

	if (leagueStatsStatus === "succeeded" && leagueStats.length > 0)
		return (
			<div className={styles.container}>
				<div className={styles.stats}>
					<h2 className={styles.title}>Top Scorers</h2>
					{topScorers.map((player: any, i: number) => (
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
			</div>
		);

	return <Loader />;
};
