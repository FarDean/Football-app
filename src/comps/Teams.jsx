import { useQuery } from "./../hooks/useQuery";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "./../redux/teamSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Teams = () => {
	const leagueId = useQuery().get("league");
	const dispatch = useDispatch();

	const teams = useSelector(state => state.team.teams);
	const teamStatus = useSelector(state => state.team.status);
	const error = useSelector(state => state.team.error);
	useEffect(() => {
		dispatch(fetchTeams(leagueId));
	}, [dispatch, leagueId]);

	console.log(teamStatus);

	if (teamStatus === "loading") return <h1>...loading</h1>;
	return (
		<>
			{error && <h1>{error}</h1>}
			{teams.map(team => (
				<Link to={`/stats?league=${leagueId}&team=${team.team.id}`}>
					<div key={team.team.id}>
						<h2>{team.team.name}</h2>
						<img src={team.team.logo} alt="" />
					</div>
				</Link>
			))}
		</>
	);
};
