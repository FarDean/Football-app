import { useSelector } from "react-redux";
import { useQuery } from "./../hooks/useQuery";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";

export const League = () => {
	const leagueId = +useQuery().get("leagueId");

	const league = useSelector(state => state.league.leagues.find(x => x.league.id === leagueId));

	return (
		<>
			<LeagueDetailWrapper league={league}>hello</LeagueDetailWrapper>
		</>
	);
};
