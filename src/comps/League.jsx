import { Hero } from "./utils/Hero";
import { useSelector } from "react-redux";
import { useQuery } from "./../hooks/useQuery";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";

export const League = () => {
	const leagueId = +useQuery().get("leagueId");

	const league = useSelector(state => state.league.leagues.find(x => x.league.id === leagueId));

	return (
		<>
			<Hero icon={league.league.logo} text={league.league.name} />
			<LeagueDetailWrapper>hello</LeagueDetailWrapper>
		</>
	);
};
