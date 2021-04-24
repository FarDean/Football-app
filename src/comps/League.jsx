import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";
import { Statnding } from "./Standing";
import { Fixtures } from "./Fixtures";
import { Teams } from "./Teams";

export const League = () => {
	let { path, url } = useRouteMatch();

	// const league = useSelector(state => state.league.leagues.find(x => x.league.id === leagueId));
	const getClass = linkName => {
		return path.includes(linkName) ? `${styles.tab} ${styles.active}` : `${styles.tab}`;
	};
	return (
		<>
			<Hero text="kos" />
			<main>
				<div className={styles.tabs}>
					<div className={getClass("standing")}>
						<Link to={`${url}standing?leagueId=$`}>Standing</Link>
					</div>
					<div className={getClass("fixtures")}>
						<Link to={`${url}/fixtures`}>Fixtures</Link>
					</div>
					<div className={getClass("teams")}>
						<Link to={`${url}teams`}>Teams</Link>
					</div>
				</div>
				<Switch>
					<Route path={`${path}/:leagueName/standing`}>
						<Statnding />
					</Route>
					<Route path={`${path}/:leagueName/fixtures`}>
						<Fixtures />
					</Route>
					<Route path={`${path}/:leagueName/teams`}>
						<Teams />
					</Route>
				</Switch>
			</main>
		</>
	);
};
