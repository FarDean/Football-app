import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route, useParams } from "react-router-dom";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";
import { Statnding } from "./Standing";
import { Fixtures } from "./Fixtures";
import { Teams } from "./Teams";

export const League = ({ match }) => {
	let { path, url } = useRouteMatch();

	// const league = useSelector(state => state.league.leagues.find(x => x.league.name === leagueId));
	const getClass = linkName => {
		return path.includes(linkName) ? `${styles.tab} ${styles.active}` : `${styles.tab}`;
	};
	return (
		<>
			<Hero text="kos" />
			<main>
				<div className={styles.tabs}>
					<div className={getClass("standing")}>
						<Link to={`${url}/`}>Standing</Link>
					</div>
					<div className={getClass("fixtures")}>
						<Link to={`${url}/`}>Fixtures</Link>
					</div>
					<div className={getClass("teams")}>
						<Link to={`${url}/`}>Teams</Link>
					</div>
				</div>
				<Switch>
					<Route path={`${path}/:leagueName/standing`} component={Statnding} />
					<Route path={`${path}/:leagueName/fixtures`} component={Fixtures} />
					<Route path={`${path}/:leagueName/teams`} component={Teams} />
				</Switch>
			</main>
		</>
	);
};
