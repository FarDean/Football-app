import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route, useParams } from "react-router-dom";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";
import { Statnding } from "./Standing";
import { Fixtures } from "./Fixtures";
import { Teams } from "./Teams";
import { Error } from "./utils/Error";

export const League = () => {
	let { path, url } = useRouteMatch();
	let { leagueName } = useParams();

	const league = useSelector(state =>
		state.league.leagues.find(x => x.league.name === leagueName.replace(/-/g, " "))
	);
	const leaguesStatus = useSelector(state => state.league.status);

	const getClass = linkName => {
		return window.location.href.includes(linkName)
			? `${styles.tab} ${styles.active}`
			: `${styles.tab}`;
	};

	if (leaguesStatus === "succeeded")
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
						<Route path={`${path}/standing`}>
							<Statnding leagueId={league.league.id} />
						</Route>
						<Route path={`${path}/fixtures`} component={Fixtures} />
						<Route path={`${path}/teams`} component={Teams} />
					</Switch>
				</main>
			</>
		);

	return <Error />;
};
