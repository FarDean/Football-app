import { Link, useLocation } from "react-router-dom";
import styles from "./../styles/LeagueWrapper.module.css";
import { useRouteMatch } from "react-router-dom";
import { LeagueDetailRouter } from "./LeagueDetailRouter";
import { Hero } from "./utils/Hero";

export const LeagueDetailWrapper = ({ children, league }) => {
	const location = useLocation();
	const { path } = useRouteMatch();

	const getClass = linkName => {
		return path.includes(linkName) ? `${styles.tab} ${styles.active}` : `${styles.tab}`;
	};

	return (
		<>
			<Hero icon={league.league.logo} text={league.league.name} />
			<main>
				<div className={styles.tabs}>
					<div className={getClass("standing")}>
						<Link to={`/leagues/standing?leagueId=${league.league.id}`}>Standing</Link>
					</div>
					<div className={getClass("fixtures")}>
						<Link to="/leagues/fixtures">Fixtures</Link>
					</div>
					<div className={getClass("teams")}>
						<Link to="/leagues/teams">Teams</Link>
					</div>
				</div>
				<LeagueDetailRouter />
			</main>
		</>
	);
};
