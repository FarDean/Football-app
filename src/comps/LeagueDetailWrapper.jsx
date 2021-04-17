import { Link, useLocation } from "react-router-dom";
import styles from "./../styles/LeagueWrapper.module.css";
import { useRouteMatch } from "react-router-dom";

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
					<Link>Standing</Link>
				</div>
				<div className={getClass("fixtures")}>
					<Link>Fixtures</Link>
				</div>
				<div className={getClass("teams")}>
					<Link>Teams</Link>
				</div>
			</div>
			{children}
		</main>
	);
};
