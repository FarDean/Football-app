import { useQuery } from "./../hooks/useQuery";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "./../redux/teamSlice";
import { useEffect } from "react";

export const Teams = () => {
	const query = useQuery().get("league");
	const dispatch = useDispatch();
	const teams = useSelector(state => state.team.teams);
	const teamStatus = useSelector(state => state.team.status);

	useEffect(() => {
		if (teamStatus === "idle") {
			dispatch(fetchTeams(query));
		}
	}, [dispatch, teamStatus, query]);
	console.log(teams);
	if (teamStatus === "loading") return <h1>...loading</h1>;
	return (
		<>
			{teams.map(team => (
				<div key={team.team.id}>
					<h2>{team.team.name}</h2>
					<img src={team.team.logo} alt="" />
				</div>
			))}
		</>
	);
};
