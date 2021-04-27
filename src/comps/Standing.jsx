import { useSelector, useDispatch } from "react-redux";
import { fetchStanding } from "./../redux/standingSlice";
import { useEffect } from "react";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import styles from "./../styles/Standing.module.css";

export const Statnding = ({ leagueId }) => {
	const dispatch = useDispatch();
	// selectors
	const standing = useSelector(state => state.standing.standing);
	const standingStatus = useSelector(state => state.standing.status);
	const error = useSelector(state => state.standing.error);

	useEffect(() => {
		dispatch(fetchStanding(leagueId));
	}, [dispatch, leagueId]);

	console.log(standing);
	if (standingStatus === "loading") return <Loader />;
	if (standingStatus === "succeeded")
		return (
			<table className={styles.table}>
				<tbody>
					<tr className={styles.head}>
						<td>Club</td>
						<td>MP</td>
						<td>W</td>
						<td>D</td>
						<td>L</td>
						<td>GF</td>
						<td>GA</td>
						<td>GD</td>
						<td>Pts</td>
						<td className={styles.last5}>Last 5</td>
					</tr>

					{standing[0].league.standings[0].map((team, i) => (
						<tr className={styles.tbrow} key={i}>
							<td className={styles.flex}>
								<span className={styles.span}>{team.rank}</span>
								<img className={styles.img} src={team.team.logo} alt="" />{" "}
								<span>{team.team.name}</span>
							</td>
							<td>{team.all.played}</td>
							<td>{team.all.win}</td>
							<td>{team.all.draw}</td>
							<td>{team.all.lose}</td>
							<td>{team.all.goals.for}</td>
							<td>{team.all.goals.against}</td>
							<td>{team.goalsDiff}</td>
							<td>{team.points}</td>
							<td className={styles.last5}>{team.form}</td>
						</tr>
					))}
				</tbody>
			</table>
		);

	return <Error text={error} />;
};
