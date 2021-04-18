import { Link, useLocation } from "react-router-dom";
import styles from "./../styles/LeagueWrapper.module.css";
import { useRouteMatch } from "react-router-dom";
import { LeagueDetailRouter } from "./LeagueDetailRouter";

export const LeagueDetailWrapper = ({ children }) => {
	const location = useLocation();
	const { path } = useRouteMatch();

	const getClass = linkName => {
		return path.includes(linkName) ? `${styles.tab} ${styles.active}` : `${styles.tab}`;
	};

	return (
		<main>
			<div className={styles.tabs}>
				<div className={getClass("standing")}>
					<Link to="/leagues/standing">Standing</Link>
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
	);
};
