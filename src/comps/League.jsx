import { useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import { LeagueDetailWrapper } from "./LeagueDetailWrapper";
import { Hero } from "./utils/Hero";
import styles from "./../styles/LeagueWrapper.module.css";

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
						<Link to={`/leagues/standing?leagueId=$`}>Standing</Link>
					</div>
					<div className={getClass("fixtures")}>
						<Link to="/leagues/fixtures">Fixtures</Link>
					</div>
					<div className={getClass("teams")}>
						<Link to="/leagues/teams">Teams</Link>
					</div>
				</div>
			</main>
		</>
	);
};
