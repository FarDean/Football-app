import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchLeagues } from "../redux/leagueSlice";
import { useAppSelector, useAppDispatch } from "./../redux/hooks";
import styles from "./../styles/Wrapper.module.css";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";
import React from "react";
import slugify from "slugify";

export const Wrapper: React.FC = React.memo((): JSX.Element => {
	const dispatch = useAppDispatch();

	const leagues = useAppSelector(state => state.league.leagues);
	const leaguesStatus = useAppSelector(state => state.league.status);
	const error = useAppSelector(state => state.league.error);

	useEffect(() => {
		if (leaguesStatus === "idle") {
			dispatch(fetchLeagues());
		}
	}, [dispatch, leaguesStatus]);

	if (leaguesStatus === "loading") return <Loader />;

	if (leaguesStatus === "failed" || leagues[0] === undefined) return <Error />;

	if (leaguesStatus === "succeeded")
		return (
			<>
				<header>
					<nav className={styles.nav}>
						<div className={styles.left}>
							<div className={styles.pulse}></div>
							<Link to="/">Live Scores</Link>
						</div>
						<div className={styles.center}>
							<img
								src="https://image.freepik.com/free-vector/king-football-logo_21010-8.jpg"
								alt=""
							/>
						</div>
						<div className={styles.right}>
							{leagues.map((league, i) => (
								<div key={i} className={styles.navItem}>
									<div className={styles.img}>
										<img
											className={styles.leagueIcon}
											src={league.league.logo}
											alt=""
										/>
									</div>
									<Link to={`/leagues/${slugify(league.league.name)}/standing`}>
										{league.league.name}
									</Link>
								</div>
							))}
						</div>
					</nav>
				</header>
			</>
		);

	return <Error text={error} />;
});
