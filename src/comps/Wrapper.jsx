import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchLeagues } from "./../redux/leagueSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./../styles/Wrapper.module.css";
import { Error } from "./utils/Error";
import { Loader } from "./utils/Loader";
import { Container } from "./utils/Container";
import React from "react";

export const Wrapper = React.memo(({ children }) => {
	const dispatch = useDispatch();

	const leagues = useSelector(state => state.league.leagues);
	const leaguesStatus = useSelector(state => state.league.status);
	const error = useSelector(state => state.league.error);

	useEffect(() => {
		if (leaguesStatus === "idle") {
			dispatch(fetchLeagues());
		}
	}, [dispatch, leaguesStatus]);

	console.log(leagues);

	if (leaguesStatus === "loading") return <Loader />;

	if (leaguesStatus === "failed") return <Error text={error} />;

	if (leaguesStatus === "succeeded")
		return (
			<Container>
				<header>
					<nav className={styles.nav}>
						<div className={styles.left}>
							<div className={styles.pulse}></div>
							<Link to="/">Live Scores</Link>
						</div>
						<div className="center">Logo</div>
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
									<Link to={`/leagues?leagueId=${league.league.id}`}>
										{league.league.name}
									</Link>
								</div>
							))}
						</div>
					</nav>
				</header>
				<hr />
				{children}
			</Container>
		);

	return <Error />;
});
