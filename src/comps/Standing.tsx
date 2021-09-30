import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { fetchStanding } from "../redux/standingSlice";
import React, { useEffect } from "react";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import styles from "./../styles/Standing.module.css";
import { useHistory, useParams } from "react-router-dom";

const icons: { [key: string]: any } = {
	W: <i className={`fas fa-check-circle ${styles.win}`}></i>,
	D: <i className={`fas fa-minus-circle ${styles.draw}`}></i>,
	L: <i className={`fas fa-times-circle ${styles.lose}`}></i>,
} as const;

interface Props {
	leagueId: string | number;
}

export const Statnding: React.FC<Props> = ({ leagueId }) => {
	const history = useHistory();

	const dispatch = useAppDispatch();
	// selectors
	const standing = useAppSelector(state => state.standing.standing);
	const standingStatus = useAppSelector(state => state.standing.status);
	const error = useAppSelector(state => state.standing.error);

	const leagues = useAppSelector(state => state.league.leagues);

	const { leagueName } = useParams<{ leagueName: string }>();

	console.log(standing);

	useEffect(() => {
		dispatch(fetchStanding(leagueId));
	}, [dispatch, leagueId]);

	if (standingStatus === "loading" || !standing[0]) return <Loader />;

	if (standingStatus === "failed") return <Error text={error} />;

	return standing[0]?.league?.standings.map((table: any) => (
		<table className={styles.table}>
			<tbody>
				<tr className={styles.head}>
					<td key={"Club"}>Club</td>
					<td key={"MP"}>MP</td>
					<td key={"W"}>W</td>
					<td key={"D"}>D</td>
					<td key={"L"}>L</td>
					<td key={"GF"}>GF</td>
					<td key={"GA"}>GA</td>
					<td key={"GD"}>GD</td>
					<td key={"Pts"}>Pts</td>
					<td key={"Last 5"} className={styles.last5}>
						Last 5
					</td>
				</tr>
				{table.map((team: any, i: number) => (
					<tr
						// to={`/${leagueName}/team/${slugify(team.team.name)}`}
						className={styles.tbrow}
						key={i}
						role="link"
						onClick={() => history.push(`/${leagueName}/teams/${team.team.id}`)}
					>
						<td key={"td1"} className={styles.flex}>
							<span className={styles.span}>{team.rank}</span>
							<img className={styles.img} src={team.team.logo} alt="" />{" "}
							<span>{team.team.name}</span>
						</td>
						<td key={"td2"}>{team.all.played}</td>
						<td key={"td3"}>{team.all.win}</td>
						<td key={"td4"}>{team.all.draw}</td>
						<td key={"td5"}>{team.all.lose}</td>
						<td key={"td6"}>{team.all.goals.for}</td>
						<td key={"td7"}>{team.all.goals.against}</td>
						<td key={"td8"}>{team.goalsDiff}</td>
						<td key={"td9"}>{team.points}</td>
						<td key={"td10"} className={styles.last5}>
							{team.form &&
								// team.form.length === 1 &&
								[...team.form].map((str, i) => (
									<span key={i} className={styles.form}>
										{icons[str]}
									</span>
								))}
						</td>
					</tr>
				))}

				{/* {standing[0]?.league?.standings[0].map((team: any, i: number) => (
					<tr
						// to={`/${leagueName}/team/${slugify(team.team.name)}`}
						className={styles.tbrow}
						key={i}
						role="link"
						onClick={() => history.push(`/${leagueName}/teams/${team.team.id}`)}
					>
						<td key={"td1"} className={styles.flex}>
							<span className={styles.span}>{team.rank}</span>
							<img className={styles.img} src={team.team.logo} alt="" />{" "}
							<span>{team.team.name}</span>
						</td>
						<td key={"td2"}>{team.all.played}</td>
						<td key={"td3"}>{team.all.win}</td>
						<td key={"td4"}>{team.all.draw}</td>
						<td key={"td5"}>{team.all.lose}</td>
						<td key={"td6"}>{team.all.goals.for}</td>
						<td key={"td7"}>{team.all.goals.against}</td>
						<td key={"td8"}>{team.goalsDiff}</td>
						<td key={"td9"}>{team.points}</td>
						<td key={"td10"} className={styles.last5}>
							{team.form &&
								// team.form.length === 1 &&
								[...team.form].map((str, i) => (
									<span key={i} className={styles.form}>
										{icons[str]}
									</span>
								))}
						</td>
					</tr>
				))} */}
			</tbody>
		</table>
	));
};
