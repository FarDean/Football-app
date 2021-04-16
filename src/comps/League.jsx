import { Hero } from "./utils/Hero";
import { useSelector } from "react-redux";
import { useQuery } from "./../hooks/useQuery";
import { useRouteMatch } from "react-router-dom";

export const League = () => {
	const leagueId = +useQuery().get("leagueId");
	let { path, url } = useRouteMatch();

	const league = useSelector(state => state.league.leagues.find(x => x.league.id === leagueId));

	console.log(path, url);

	return <Hero icon={league.league.logo} text={league.league.name} />;
};
