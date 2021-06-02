// import { useAppSelector, useAppDispatch } from "./../redux/hooks";
// import { fetchTeam } from "./../redux/teamDetailSlice";
// import { fetchStanding } from "./../redux/standingSlice";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import slugify from "slugify";

export const TeamDetail: React.FC = (): JSX.Element => {
	// 	const { leagueName, teamName } = useParams<{ leagueName: string; teamName: string }>();

	// 	const dispatch = useAppDispatch();

	// 	// main Selectors
	// 	const team = useAppSelector(state => state.team.team);
	// 	const fetchTeamStatus = useAppSelector(state => state.team.status);
	// 	const error = useAppSelector(state => state.team.error);

	// 	const teamId = useAppSelector(
	// 		state =>
	// 			state.standing.standing[0]?.league.standings[0].find(
	// 				(team: any) => slugify(team.team.name) === teamName
	// 			).team.id
	// 	);

	// 	console.log(teamId);

	// 	useEffect(() => {
	// 		if (!teamId) {
	// 			dispatch(fetchStanding())
	// 		}
	// 		// if(fetchTeamStatus === 'idle'){
	// 		// 	dispatch(fetchTeam({leagueId,teamId}))
	// 		// }
	// 	}, []);
	// if (!teamId) return <h1>kos</h1>;
	return <h1>Team Detail</h1>;
};
