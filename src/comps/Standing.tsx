import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { fetchStanding } from "../redux/standingSlice";
import React, { useEffect } from "react";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import styles from "./../styles/Standing.module.css";
import slugify from "slugify";
import { Link } from "react-router-dom";

const icons: { [key: string]: any } = {
	W: <i className={`fas fa-check-circle ${styles.win}`}></i>,
	D: <i className={`fas fa-minus-circle ${styles.draw}`}></i>,
	L: <i className={`fas fa-times-circle ${styles.lose}`}></i>,
} as const;

interface Props {
	leagueId: string | number;
}

export const Statnding: React.FC<Props> = ({ leagueId }) => {
	const dispatch = useAppDispatch();
	// selectors
	const standing = useAppSelector(state => state.standing.standing);
	const standingStatus = useAppSelector(state => state.standing.status);
	const error = useAppSelector(state => state.standing.error);

	useEffect(() => {
		dispatch(fetchStanding(leagueId));
	}, [dispatch, leagueId]);

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

					{standing[0].league.standings[0].map((team: any, i: number) => (
						<>
							<Link
								to={`/team/${slugify(team.team.name)}`}
								className={styles.tbrow}
								key={i}
							>
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
								<td className={styles.last5}>
									{[...team.form].map((str, i) => (
										<span key={i} className={styles.form}>
											{icons[str]}
										</span>
									))}
								</td>
							</Link>
						</>
					))}
				</tbody>
			</table>
		);

	return <Error text={error} />;
};
