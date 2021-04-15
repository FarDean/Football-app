import { Hero } from "./utils/Hero";
import { useSelector } from "react-redux";
import { useQuery } from "./../hooks/useQuery";

export const League = () => {
	const leagueId = +useQuery().get("leagueId");

	const league = useSelector(state => state.league.leagues.find(x => x.league.id === leagueId));

	console.log(league);

	return <Hero icon={league.league.logo} text={league.league.name} />;
};
