import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route, useParams } from "react-router-dom";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";
import { Statnding } from "./Standing";
import { Fixtures } from "./Fixtures";
import { Teams } from "./Teams";
import slugify from "slugify";

export const League = ({ match }) => {
	let { path, url } = useRouteMatch();
	let { leagueName } = useParams();

	const league = useSelector(state =>
		state.league.leagues.find(x => x.league.name === leagueName.replace(/-/g, " "))
	);
	console.log(url);
	const getClass = linkName => {
		return path.includes(linkName) ? `${styles.tab} ${styles.active}` : `${styles.tab}`;
	};
	return (
		<>
			<Hero text={league.league.name} icon={league.league.logo} />
			<main>
				<div className={styles.tabs}>
					<div className={getClass("standing")}>
						<Link to={`${url}/standing`}>Standing</Link>
					</div>
					<div className={getClass("fixtures")}>
						<Link to={`${url}/fixtures`}>Fixtures</Link>
					</div>
					<div className={getClass("teams")}>
						<Link to={`${url}/teams`}>Teams</Link>
					</div>
				</div>
				<Switch>
					<Route path={`${path}/standing`} component={Statnding} />
					<Route path={`${path}/fixtures`} component={Fixtures} />
					<Route path={`${path}/teams`} component={Teams} />
				</Switch>
			</main>
		</>
	);
};
