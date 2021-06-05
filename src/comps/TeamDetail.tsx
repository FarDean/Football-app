import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import { fetchTeam } from "./../redux/teamDetailSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import { Loader } from "./utils/Loader";
import { Error } from "./utils/Error";
import { Hero } from "./utils/Hero";
import { Container } from "./utils/Container";
import styles from "./../styles/TeamDetail.module.css";

export const TeamDetail: React.FC = (): JSX.Element => {
	const { leagueName, teamId } = useParams<{ leagueName: string; teamId: string }>();

	const dispatch = useAppDispatch();

	// main Selectors
	const team = useAppSelector(state => state.team.team);
	const teamStatus = useAppSelector(state => state.team.status);
	const error = useAppSelector(state => state.team.error);
	const leagueId = useAppSelector(
		state =>
			state.league.leagues.find(league => slugify(league.league.name) === leagueName)?.league
				.id
	);

	console.log(team);

	useEffect(() => {
		if (teamStatus === "idle" && leagueId) {
			dispatch(fetchTeam({ leagueId, teamId }));
		}
	}, [dispatch, leagueId, teamId, teamStatus]);

	if (teamStatus === "loading") return <Loader />;
	if (teamStatus === "failed") return <Error text={error} />;

	if (teamStatus === "succeeded" && team)
		return (
			<>
				<Hero icon={team.team.logo} text={team.team.name} />
				<Container>
					<table className={styles.table}>
						<tbody>
							<tr>
								<th></th>
								<th>Home</th>
								<th>Away</th>
								<th>Total</th>
							</tr>
							<tr>
								<th>Most Goals Scored</th>
								<td>{team.biggest!.goals!.for.home}</td>
								<td>{team.biggest!.goals!.for.away}</td>
							</tr>
							<tr>
								<th>Most Goals Conceded</th>
								<td>{team.biggest!.goals!.against.home}</td>
								<td>{team.biggest!.goals!.against.away}</td>
							</tr>
							<tr>
								<th>Biggest Win</th>
								<td>{team.biggest!.wins!.home}</td>
								<td>{team.biggest!.wins!.away}</td>
							</tr>
							<tr>
								<th>Biggest Lose</th>
								<td>{team.biggest!.loses!.home}</td>
								<td>{team.biggest!.loses!.away}</td>
							</tr>
							<tr>
								<th>Clean Sheets</th>
								<td>{team.clean_sheet.home}</td>
								<td>{team.clean_sheet.away}</td>
								<td>{team.clean_sheet.total}</td>
							</tr>
							<tr>
								<th>Matches Played</th>
								<td>{team.fixtures.played.home}</td>
								<td>{team.fixtures.played.away}</td>
								<td>{team.fixtures.played.total}</td>
							</tr>
							<tr>
								<th>Wins</th>
								<td>{team.fixtures.wins.home}</td>
								<td>{team.fixtures.wins.away}</td>
								<td>{team.fixtures.wins.total}</td>
							</tr>
							<tr>
								<th>Draws</th>
								<td>{team.fixtures.draws.home}</td>
								<td>{team.fixtures.draws.away}</td>
								<td>{team.fixtures.draws.total}</td>
							</tr>
							<tr>
								<th>Loses</th>
								<td>{team.fixtures.loses.home}</td>
								<td>{team.fixtures.loses.away}</td>
								<td>{team.fixtures.loses.total}</td>
							</tr>
							<tr>
								<th></th>
								<th>Win</th>
								<th>Draw</th>
								<th>Lose</th>
							</tr>
							<tr>
								<th>Streak</th>
								<td>{team.biggest!.streak!.wins}</td>
								<td>{team.biggest!.streak!.draws}</td>
								<td>{team.biggest!.streak!.loses}</td>
							</tr>
							<tr>
								<th></th>
								{Object.entries(team.cards.yellow).map(([key, value]) => (
									<th key={key}>{key}`</th>
								))}
							</tr>
							<tr>
								<th>Yellow Cards</th>
								{Object.entries(team.cards.yellow).map(([key, value]: any) => (
									<td key={key}>{value.total ?? "-"}</td>
								))}
							</tr>
							<tr>
								<th>Red Cards</th>
								{Object.entries(team.cards.red).map(([key, value]: any) => (
									<td key={key}>{value.total ?? "-"}</td>
								))}
							</tr>
						</tbody>
					</table>
				</Container>
			</>
		);
	return <Loader />;
};
