import { useAppSelector } from "./../redux/hooks";
import { useRouteMatch, Link, Switch, Route, useParams } from "react-router-dom";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";
import { Statnding } from "./Standing";
import { Fixtures } from "./Fixtures";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";
import { LeagueStats } from "./LeagueStats";

export const League: React.FC = (): JSX.Element => {
	let { path, url } = useRouteMatch();
	let { leagueName }: { leagueName: string } = useParams();

	const league = useAppSelector(state =>
		state.league.leagues.find(x => x.league.name === leagueName.replace(/-/g, " "))
	);

	const leaguesStatus = useAppSelector(state => state.league.status);

	const getClass = (linkName: string) => {
		return window.location.href.includes(linkName)
			? `${styles.tab} ${styles.active}`
			: `${styles.tab}`;
	};

	if (leaguesStatus === "loading") return <Loader />;
	if (leaguesStatus === "succeeded" && league)
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
						<div className={getClass("stats")}>
							<Link to={`${url}/stats`}>Stats</Link>
						</div>
					</div>
					<Switch>
						<Route path={`${path}/standing`}>
							<Statnding leagueId={league.league.id} />
						</Route>
						<Route path={`${path}/fixtures`}>
							<Fixtures leagueId={league.league.id} />
						</Route>
						<Route path={`${path}/stats`}>
							<LeagueStats />
						</Route>
					</Switch>
				</main>
			</>
		);

	return <Error />;
};
