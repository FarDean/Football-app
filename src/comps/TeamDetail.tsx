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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { TeamFixtures } from "./TeamFixtures";

export const TeamDetail: React.FC = (): JSX.Element => {
	const { leagueName, teamId } = useParams<{ leagueName: string; teamId: string }>();

	const dispatch = useAppDispatch();

	const leagueId = useAppSelector(
		state =>
			state.league.leagues.find(league => slugify(league.league.name) === leagueName)?.league
				.id
	);

	useEffect(() => {
		if (leagueId) {
			dispatch(fetchTeam({ leagueId, teamId }));
		}
	}, [dispatch, leagueId, teamId]);
	// main Selectors
	const team = useAppSelector(state => state.team.team);
	const teamStatus = useAppSelector(state => state.team.status);
	const error = useAppSelector(state => state.team.error);

	if (teamStatus === "loading") return <Loader />;
	if (teamStatus === "failed") return <Error text={error} />;

	if (teamStatus === "succeeded" && team.team)
		return (
			<>
				<Hero icon={team.team.logo} text={team.team.name} />
				<Container>
					<Tabs>
						<TabList>
							<Tab>Statistics</Tab>
							<Tab>Fixtures</Tab>
							<Tab>Players</Tab>
							<Tab>Transfers</Tab>
							<Tab>Injuries</Tab>
						</TabList>

						<TabPanel>
							<table className={styles.table}>
								<tbody>
									<tr>
										<th></th>
										<th>Home</th>
										<th>Away</th>
										<th>Total</th>
									</tr>
									<tr>
										<th>Average Goals Scored</th>
										<td>{team.goals.for.average.home}</td>
										<td>{team.goals.for.average.away}</td>
										<td>{team.goals.for.average.total}</td>
									</tr>
									<tr>
										<th>Total Goals Scored</th>
										<td>{team.goals.for.total.home}</td>
										<td>{team.goals.for.total.away}</td>
										<td>{team.goals.for.total.total}</td>
									</tr>
									<tr>
										<th>Average Goals Conceded</th>
										<td>{team.goals.against.average.home}</td>
										<td>{team.goals.against.average.away}</td>
										<td>{team.goals.against.average.total}</td>
									</tr>
									<tr>
										<th>Total Goals Conceded</th>
										<td>{team.goals.against.total.home}</td>
										<td>{team.goals.against.total.away}</td>
										<td>{team.goals.against.total.total}</td>
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
									{/* <tr>
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
							<tr>
								<th></th>
							</tr>
							<tr>
								<th>Lineups</th>
								{team.lineups.map((lineup: any, i: number) => (
									<td>
										{lineup.formation} in {lineup.played} games
									</td>
								))}
							</tr> */}
									<tr>
										<th></th>
										<th>Total</th>
										<th>Scored</th>
									</tr>
									<tr>
										<th>Penalties</th>
										<td>{team.penalty.total}</td>
										<td>{team.penalty.scored.total}</td>
									</tr>
								</tbody>
							</table>
						</TabPanel>
						<TabPanel>
							<TeamFixtures />
						</TabPanel>
						<TabPanel>
							<h3>Players</h3>
						</TabPanel>
						<TabPanel>
							<h3>Transfers</h3>
						</TabPanel>
						<TabPanel>
							<h3>Injuries</h3>
						</TabPanel>
					</Tabs>
				</Container>
			</>
		);
	return <Loader />;
};
